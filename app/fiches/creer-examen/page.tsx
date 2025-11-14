"use client"

import { useState, useEffect } from "react"
import { ChevronDown, X, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import MoleculeEditor, { Molecule } from "@/components/ui/molecule-editor"

type Exam = {
  id: string
  title: string
  subject: string
  description?: string
  molecules: Molecule[]
  createdAt: string
}

const STORAGE_KEY = "exams"

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function CreateExamPage() {
  const router = useRouter()
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("Physique-Chimie")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [molecules, setMolecules] = useState<Molecule[]>([])
  

  const subjects = [
    { name: "Mathématiques", icon: "📐", color: "text-[#6B8EFF]", bgColor: "bg-[#EEF2FF]" },
    { name: "Physique-Chimie", icon: "🧪", color: "text-[#A855F7]", bgColor: "bg-[#FAF5FF]" },
    { name: "SVT", icon: "🌿", color: "text-[#10B981]", bgColor: "bg-[#ECFDF5]" },
    { name: "Français", icon: "📚", color: "text-[#EF4444]", bgColor: "bg-[#FEF2F2]" },
  ]

  useEffect(() => {
    // nothing special for now
  }, [])

  function saveExam() {
    if (!title.trim()) {
      alert("Le titre est requis")
      return
    }

    const exam: Exam = {
      id: uid(),
      title: title.trim(),
      subject: selectedSubject,
      description: description.trim() || undefined,
      molecules,
      createdAt: new Date().toISOString(),
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const arr: Exam[] = raw ? JSON.parse(raw) : []
      arr.unshift(exam)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
      alert("Examen enregistré")
      router.push('/fiches')
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'enregistrement")
    }
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
          <button onClick={() => router.back()} className="text-slate-600 hover:text-slate-800">Retour</button>
          <div className="flex-1 text-center font-bold">Créer un examen</div>
          <div style={{ width: 72 }} />
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex gap-3">
              <input className="flex-1 bg-white rounded-full px-4 py-2 shadow-sm" placeholder="Titre de l'examen" value={title} onChange={e => setTitle(e.target.value)} />
              <button onClick={() => setIsSubjectModalOpen(true)} className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] text-[#4B6FFF] px-4 py-2 rounded-full">{selectedSubject} <ChevronDown className="inline-block ml-2 -mb-1" /></button>
            </div>

            <textarea className="w-full bg-white rounded-lg p-3 shadow-sm" placeholder="Description (optionnel)" value={description} onChange={e => setDescription(e.target.value)} />

            <MoleculeEditor molecules={molecules} setMolecules={setMolecules} />

            <div className="flex justify-end">
              <button onClick={saveExam} className="px-6 py-2 bg-purple-600 text-white rounded-full">Enregistrer l'examen</button>
            </div>
          </div>
        </div>
      </main>

      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex md:items-center md:justify-center items-end" onClick={() => setIsSubjectModalOpen(false)}>
          <div className="bg-white rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md p-8 animate-slide-up max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Choisis ta matière</h3>
              <button onClick={() => setIsSubjectModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 -mr-2"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <button key={subject.name} onClick={() => { setSelectedSubject(subject.name); setIsSubjectModalOpen(false) }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${selectedSubject === subject.name ? subject.bgColor + " shadow-md" : "bg-slate-50 hover:bg-slate-100"}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${selectedSubject === subject.name ? "bg-white/60" : "bg-white"}`}>{subject.icon}</div>
                  <span className={`font-bold text-lg flex-1 text-left ${subject.color}`}>{subject.name}</span>
                  {selectedSubject === subject.name && <Check className={`w-6 h-6 ${subject.color}`} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
