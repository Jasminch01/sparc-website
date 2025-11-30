import { type SchemaTypeDefinition } from 'sanity'
import { archiveSchema } from './schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [archiveSchema],
}
