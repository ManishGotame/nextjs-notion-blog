import * as types from 'lib/types'
import { ExtractTitlesResponse } from 'lib/types'

export const getTitles = (data: types.ExtendedRecordMap) => {
  const titles: ExtractTitlesResponse[] = []
  const blocks = data.block

  for (const blockId in blocks) {
    // eslint-disable-next-line no-prototype-builtins
    if (blocks.hasOwnProperty(blockId)) {
      const block = blocks[blockId].value

      if (block.type === 'page' && block.properties && block.properties.title) {
        const title = block.properties.title[0][0]
        titles.push({
          title: title,
          id: block.id
        })
      }
    }
  }

  return titles
}
