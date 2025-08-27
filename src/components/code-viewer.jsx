import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Copy, Check } from "lucide-react"

async function fetchCodeContent(folderName, fileType) {
    try {
        // Para CSS
        if (fileType === 'css') {
            const response = await fetch(`./activities/${folderName}/style.css?t=${Date.now()}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const content = await response.text();
            return content || '/* Archivo CSS vacío */';
        }

        // Para HTML y JS
        const fileName = fileType === 'js' ? 'script.js' : 'index.html';
        const response = await fetch(`./activities/${folderName}/${fileName}?t=${Date.now()}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let content = await response.text();

        // Para HTML: limpiar el contenido
        if (fileType === 'html') {
            // Si es un documento HTML completo, extraer solo el contenido del body
            if (content.includes('<!DOCTYPE') || content.includes('<html') || content.includes('<head>')) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                const bodyContent = tempDiv.querySelector('body')?.innerHTML || content;

                // Limpiar elementos no deseados pero mantener la estructura de la actividad
                const cleanContent = bodyContent
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/<link\b[^>]*>/gi, '')
                    .replace(/<!DOCTYPE[^>]*>/i, '')
                    .trim();

                return cleanContent || '<!-- No se encontró contenido HTML -->';
            }
            // Si ya es solo el contenido del body (sin estructura HTML completa)
            return content;
        }

        return content;
    } catch (error) {
        console.error(`Error loading ${fileType} file:`, error);
        return `/* Error al cargar archivo ${fileType} */\n/* ${error.message} */`;
    }
}

function CopyButton({ content, fileType }) {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(content)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Error al copiar:", err)
        }
    }

    return (
        <Button onClick={copyToClipboard} variant="outline" size="sm" className="absolute top-2 right-6">
            {isCopied ? (
                <>
                    <Check className="h-4 w-4 mr-2" />
                    Copiado
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                </>
            )}
        </Button>
    )
}

function CodeBlock({ content, language }) {
    return (
        <div className="relative">
            <pre className="rounded-lg bg-muted p-4 overflow-auto max-h-[480px]">
                <code>{content || `No hay código ${language} disponible`}</code>
            </pre>
            <CopyButton content={content} fileType={language.toLowerCase()} />
        </div>
    )
}

export function CodeViewer({ activity }) {
    const [selectedFileType, setSelectedFileType] = useState("html")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadContent = async () => {
            try {
                setLoading(true)
                setError(null)
                const codeContent = await fetchCodeContent(activity.folder, selectedFileType)
                setContent(codeContent)
            } catch (err) {
                setError(`Error al cargar ${selectedFileType}: ${err.message}`)
                setContent(`Error: ${err.message}`)
            } finally {
                setLoading(false)
            }
        }

        loadContent()
    }, [activity.folder, selectedFileType])

    if (loading) {
        return <div className="p-4 text-center">Cargando...</div>
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                {error}
                <div className="text-sm text-muted-foreground mt-2">
                    Verifica que el archivo {selectedFileType === 'js' ? 'script.js' : `index.${selectedFileType}`} exista en la carpeta de la actividad
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <Tabs
                    value={selectedFileType}
                    onValueChange={setSelectedFileType}
                    className="flex-shrink-0"
                >
                    <TabsList>
                        <TabsTrigger value="html">HTML</TabsTrigger>
                        <TabsTrigger value="css">CSS</TabsTrigger>
                        <TabsTrigger value="js">JavaScript</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex-1 overflow-hidden">
                <CodeBlock
                    content={content}
                    language={selectedFileType.toUpperCase()}
                />
            </div>
        </div>
    )
}