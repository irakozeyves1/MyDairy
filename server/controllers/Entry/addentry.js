/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import { Entry, entries } from '../../models/entry.model';
import createdOn from '../../helpers/timestamp';
import Respond from '../../helpers/response';

const Datetime = createdOn();

// create entry

export const entry = (req, res) => {
  const entry = new Entry(entries.length + 1, Datetime, req.body.title, req.body.description);
  entries.push(entry);

  return res.status(201).json(new Respond(201, 'entry successfully created ', entry, null).reply());
};

// update entry
export const update = (req, res) => {
  const { entryId } = req.params;
  const { title, description } = req.body;
  if (isNaN(entryId)) {
    return res.status(400).json(new Respond(400, `EntryId ${entryId} should be an integer`, null).reply());
  }
  const oneEntry = entries.find((entry) => entry.id == entryId);
  if (!oneEntry) {
    return res.status(404).json(new Respond(404, `Entry with Id ${entryId} was  not found`, null).reply());
  }
  oneEntry.title = title;
  oneEntry.description = description;
  return res.status(200).json(new Respond(200, 'Entry edited successfully', oneEntry, null).reply());
};

// remove an entry
export const remove = (req, res) => {
  const removes = entries.findIndex((entry) => entry.id == req.params.entryId);
  if (removes > -1) {
    entries.splice(removes, 1);
    return res.status(200).json(new Respond(200, 'entry successfully deleted', null).reply());
  }
};


export const entryElement = (req, res) => res.status(200).json(new Respond(200, '', entries.reverse(), null).reply());

export const getEntryById = (req, res) => {
  const byid = entries.find((ide) => ide.id == req.params.entryId);
  if (byid) {
    return res.status(200).json(new Respond(200, '', byid, null).reply());
  }
  return res.status(404).send(new Respond(404, 'No record found ', null).reply());
};
