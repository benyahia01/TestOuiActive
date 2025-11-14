"use client"

import React, { useState } from "react"

export type Molecule = {
  id: string
  name: string
  formula: string
  imageUrl?: string
  notes?: string
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export type MoleculeEditorProps = {
  molecules: Molecule[]
  setMolecules: React.Dispatch<React.SetStateAction<Molecule[]>>
}

export default function MoleculeEditor({ molecules, setMolecules }: MoleculeEditorProps) {
  const [name, setName] = useState("")
  const [formula, setFormula] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [notes, setNotes] = useState("")

  function addMolecule(e?: React.FormEvent) {
    e?.preventDefault()
    if (!name.trim() && !formula.trim()) return
    const m: Molecule = {
      id: uid(),
      name: name.trim(),
      formula: formula.trim(),
      imageUrl: imageUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    }
    setMolecules(prev => [m, ...prev])
    setName("")
    setFormula("")
    setImageUrl("")
    setNotes("")
  }

  function removeMolecule(id: string) {
    setMolecules(prev => prev.filter(p => p.id !== id))
  }

  function exportMolecules() {
    const dataStr = JSON.stringify(molecules, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "molecules.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  function importMolecules(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((p: any) => ({ id: p.id || uid(), name: p.name || "", formula: p.formula || "", imageUrl: p.imageUrl, notes: p.notes }))
          setMolecules(normalized)
        } else {
          alert("Fichier JSON invalide : attendu un tableau")
        }
      } catch (err) {
        alert("Impossible de lire le fichier JSON")
      }
    }
    reader.readAsText(file)
    e.currentTarget.value = ""
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="font-bold mb-2">Molécules</h3>
      <form onSubmit={addMolecule} className="grid gap-2">
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-50 rounded px-3 py-2" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
          <input className="flex-1 bg-slate-50 rounded px-3 py-2" placeholder="Formule" value={formula} onChange={e => setFormula(e.target.value)} />
        </div>
        <input className="w-full bg-slate-50 rounded px-3 py-2" placeholder="Image URL (optionnel)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <textarea className="w-full bg-slate-50 rounded px-3 py-2" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Ajouter molécule</button>
          <button type="button" onClick={() => { setMolecules([]) }} className="px-4 py-2 bg-slate-100 rounded">Tout supprimer</button>
          <button type="button" onClick={exportMolecules} className="px-4 py-2 bg-slate-100 rounded">Exporter</button>
          <label className="px-4 py-2 bg-slate-100 rounded cursor-pointer">
            Importer
            <input type="file" accept="application/json" onChange={importMolecules} style={{ display: 'none' }} />
          </label>
        </div>
      </form>

      <div className="mt-4 grid gap-3">
        {molecules.length === 0 && <div className="text-sm text-slate-500">Aucune molécule ajoutée</div>}
        {molecules.map(m => (
          <div key={m.id} className="flex items-start gap-3 bg-slate-50 p-3 rounded">
            <div className="w-20 h-20 bg-white rounded overflow-hidden flex items-center justify-center">
              {m.imageUrl ? <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" /> : <div className="text-xs text-slate-400">Aucune image</div>}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{m.name || '(sans nom)'}</div>
                  <div className="text-sm font-mono text-slate-600">{m.formula}</div>
                </div>
                <div>
                  <button onClick={() => removeMolecule(m.id)} className="text-red-600">Supprimer</button>
                </div>
              </div>
              {m.notes && <div className="text-sm text-slate-700 mt-2">{m.notes}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
