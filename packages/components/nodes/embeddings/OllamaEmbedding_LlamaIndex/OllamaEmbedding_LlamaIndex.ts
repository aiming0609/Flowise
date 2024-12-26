import { OllamaEmbeddings } from '@langchain/ollama'
import { BaseEmbedding } from 'llamaindex'
import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'

class OllamaEmbeddingWrapper extends BaseEmbedding {
    private ollamaEmbeddings: OllamaEmbeddings

    constructor(ollamaEmbeddings: OllamaEmbeddings) {
        super()
        this.ollamaEmbeddings = ollamaEmbeddings
    }

    async getTextEmbedding(text: string): Promise<number[]> {
        const embeddings = await this.ollamaEmbeddings.embedQuery(text)
        return embeddings
    }

    async getTextEmbeddings(texts: string[]): Promise<number[][]> {
        const embeddings = await this.ollamaEmbeddings.embedDocuments(texts)
        return embeddings
    }

    async getQueryEmbedding(text: string): Promise<number[]> {
        return this.getTextEmbedding(text)
    }
}

export class OllamaEmbedding_LlamaIndex_Embeddings implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    tags: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Ollama Embeddings'
        this.name = 'ollamaEmbedding_LlamaIndex'
        this.version = 1.0
        this.type = 'OllamaEmbedding'
        this.icon = 'ollama.svg'
        this.category = 'Embeddings'
        this.description = 'Ollama API embeddings specific for LlamaIndex'
        this.baseClasses = [this.type, 'BaseEmbedding_LlamaIndex', ...getBaseClasses(BaseEmbedding)]
        this.tags = ['LlamaIndex']
        this.inputs = [
            {
                label: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'http://localhost:11434',
                placeholder: 'http://localhost:11434'
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'options',
                options: [
                    {
                        label: 'llama2',
                        name: 'llama2'
                    },
                    {
                        label: 'mistral',
                        name: 'mistral'
                    },
                    {
                        label: 'codellama',
                        name: 'codellama'
                    },
                    {
                        label: 'nomic-embed-text',
                        name: 'nomic-embed-text'
                    }
                ],
                default: 'llama2'
            },
            {
                label: 'Number of GPU',
                name: 'numGpu',
                type: 'number',
                description: 'The number of layers to send to the GPU(s). On macOS it defaults to 1 to enable metal support, 0 to disable.',
                placeholder: '1',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Number of Threads',
                name: 'numThread',
                type: 'number',
                description: 'Sets the number of threads to use during computation.',
                placeholder: '4',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Use MMap',
                name: 'useMMap',
                type: 'boolean',
                description: 'Whether to use memory mapping for the model or not',
                default: true,
                optional: true,
                additionalParams: true
            }
        ]
    }

    async init(nodeData: INodeData): Promise<any> {
        const modelName = nodeData.inputs?.modelName as string
        const baseUrl = nodeData.inputs?.baseUrl as string
        const numThread = nodeData.inputs?.numThread as string
        const numGpu = nodeData.inputs?.numGpu as string
        const useMMap = nodeData.inputs?.useMMap as boolean

        if (!modelName) throw new Error('Model name is required')

        const ollamaEmbeddings = new OllamaEmbeddings({
            model: modelName,
            baseUrl: baseUrl,
            requestOptions: {
                numThread: numThread ? parseInt(numThread) : undefined,
                numGpu: numGpu ? parseInt(numGpu) : undefined,
                useMmap: useMMap
            }
        })

        return new OllamaEmbeddingWrapper(ollamaEmbeddings)
    }
}

module.exports = { nodeClass: OllamaEmbedding_LlamaIndex_Embeddings }
