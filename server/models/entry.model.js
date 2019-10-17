export class Entry {
  constructor(entryId, CreatedOn, title, description) {
    this.id = entryId;
    this.CreatedOn = CreatedOn;
    this.title = title;
    this.description = description;
  }
}


export const entries = [];
