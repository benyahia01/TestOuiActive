"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Copy,
  RotateCw,
  Download,
  Printer,
  Send,
  Keyboard,
  Paperclip,
  MessageCircle,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RevisionPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Dans cet exercice de chimie sur l'identification des ions en solution, l'objectif est de comprendre comment l'ajout de nitrate d'argent (AgNO₃) permet de détecter la présence d'ions chlorure (Cl⁻).\n\nJe vois que tu souhaites de l'aide pour la question 1 : on ajoute AgNO₃ à une solution inconnue et on observe un précipité blanc qui noircit à la lumière.\n\nC'est bien, car ce précipité blanc correspond à la formation de chlorure d'argent (AgCl), un solide peu soluble.\n\nPeux-tu me dire pourquoi la formation de ce précipité indique la présence d'ions chlorure dans la solution ?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat-fiche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          subject: "Physique-Chimie",
          topic: "Identification des ions",
        }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur s'est produite. Réessaye plus tard." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
        <Link href="/fiches" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Révision</h1>
        <button
          onClick={() => setIsChatOpen(true)}
          className="md:hidden p-2 -mr-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <div className="hidden md:block w-10" />
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className="w-full md:flex-1 overflow-y-auto px-6 py-6 bg-gray-50 md:border-r border-gray-200">
          {/* Exercise 1 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Exercice 1:</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <RotateCw className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Printer className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div>
                <p className="font-semibold mb-1">Question 1 :</p>
                <p>
                  On réalise un test avec une solution aqueuse inconnue. On ajoute du nitrate d'argent (
                  <span className="italic">AgNO₃</span>) et observe un précipité blanc qui noircit à la lumière. Que
                  pouvez-vous en déduire sur les ions présents dans la solution ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 2 :</p>
                <p>
                  En ajoutant de la soude (<span className="italic">NaOH</span>) à la même solution, aucun précipité
                  n'apparaît. Que signifie cette observation concernant la présence d'ions métalliques ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 3 :</p>
                <p>
                  Lorsqu'on place la solution dans une flamme et qu'on observe une couleur violette, quels ions peut-on
                  suspecter ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 4 :</p>
                <p>
                  En combinant les résultats des trois tests précédents, quelle est la composition ionique probable de
                  la solution ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 5 :</p>
                <p>Expliquez pourquoi le précipité formé avec le nitrate d'argent noircit à la lumière.</p>
              </div>
            </div>
          </div>

          {/* Exercise 2 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Exercice 2:</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <RotateCw className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Printer className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div>
                <p className="font-semibold mb-1">Question 1 :</p>
                <p>
                  Le chlore (Cl) a pour numéro atomique 17. Expliquez comment un atome de chlore forme un ion chlorure{" "}
                  <span className="italic">Cl⁻</span>. Quelle est sa configuration électronique après transformation ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 2 :</p>
                <p>
                  L'oxygène (O) a pour numéro atomique 8. Expliquez comment un atome d'oxygène forme un ion oxyde{" "}
                  <span className="italic">O²⁻</span>. Quelle est sa configuration électronique après transformation ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 3 :</p>
                <p>
                  Un atome d'aluminium (Al) a pour numéro atomique 13 et une configuration électronique{" "}
                  <span className="italic">(K)²(L)⁸(M)³</span>. Déterminez la charge électrique de l'ion aluminium formé
                  et sa formule.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 4 :</p>
                <p>Pourquoi les atomes ont-ils tendance à former des ions en gagnant ou perdant des électrons ?</p>
              </div>
            </div>
          </div>

          {/* Exercise 3 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Exercice 3:</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <RotateCw className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Printer className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="my-6">
                <Image
                  src="/images/molecules/reaction-hcl.png"
                  alt="Mécanisme réactionnel de l'addition de HCl"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </div>

              <div>
                <p className="font-semibold mb-1">Question 1 :</p>
                <p>
                  Décrivez le mécanisme de la première étape de l'addition de HCl sur l'alcène. Quel intermédiaire
                  réactionnel se forme ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 2 :</p>
                <p>
                  Expliquez pourquoi l'ion chlorure (Cl⁻) attaque le carbocation lors de la deuxième étape. Quel est le
                  produit final ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 3 :</p>
                <p>
                  Quelle est la différence entre les deux voies réactionnelles présentées dans le schéma ? Pourquoi
                  obtient-on des produits différents ?
                </p>
              </div>
            </div>
          </div>

          {/* Exercise 4 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Exercice 4:</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <RotateCw className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Printer className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="my-6">
                <Image
                  src="/images/molecules/carbon-types.png"
                  alt="Classification des atomes de carbone"
                  width={700}
                  height={200}
                  className="w-full h-auto"
                />
              </div>

              <div>
                <p className="font-semibold mb-1">Question 1 :</p>
                <p>
                  Définissez ce qu'est un carbone tertiaire. Combien d'atomes de carbone sont directement liés à ce
                  carbone central ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 2 :</p>
                <p>
                  Classez les carbones suivants selon leur type (primaire, secondaire, tertiaire) dans la molécule
                  2-méthylbutane.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 3 :</p>
                <p>
                  Expliquez pourquoi la stabilité des carbocations suit l'ordre : tertiaire &gt; secondaire &gt;
                  primaire &gt; nullaire.
                </p>
              </div>
            </div>
          </div>

          {/* Exercise 5 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Exercice 5:</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <RotateCw className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Printer className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="my-6">
                <Image
                  src="/images/molecules/carbocations.png"
                  alt="Effet mésomère et carbocations"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <div>
                <p className="font-semibold mb-1">Question 1 :</p>
                <p>
                  Qu'est-ce que l'effet mésomère +M ? Comment stabilise-t-il les carbocations présentés dans le schéma ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 2 :</p>
                <p>
                  Dessinez les formes mésomères du carbocation allylique. Expliquez pourquoi ce carbocation est plus
                  stable qu'un carbocation primaire classique.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 3 :</p>
                <p>
                  Comparez la stabilité du carbocation benzylique avec celle d'un carbocation tertiaire. Lequel est le
                  plus stable et pourquoi ?
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Question 4 :</p>
                <p>
                  Pourquoi dit-on que "les carbocations sont des espèces électrophiles" ? Donnez un exemple de réaction
                  où un carbocation agit comme électrophile.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`
            fixed md:relative inset-0 md:inset-auto
            md:w-[45%] flex flex-col bg-white
            transition-transform duration-300 ease-in-out
            ${isChatOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
            z-50 md:z-auto
          `}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setIsChatOpen(false)}
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex-1 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                aide moi pour la question 1
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 mr-3">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dinobot-logo-FNB6LHXRYN4MNMmqlZz3BvbXUAwPPz.png"
                        alt="Assistant"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user" ? "bg-blue-600 text-white" : "bg-blue-50 text-gray-800 border border-blue-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dinobot-logo-FNB6LHXRYN4MNMmqlZz3BvbXUAwPPz.png"
                      alt="Assistant"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-100">•</span>
                      <span className="animate-bounce delay-200">•</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-shrink-0">
                <Keyboard className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Envoi un message..."
                className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {isChatOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsChatOpen(false)} />
        )}
      </main>
    </div>
  )
}
