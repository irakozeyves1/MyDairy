
import { Entry } from '../models/entry.model';
import createdOn from '../helpers/timestamp';
import Respond from '../helpers/response';
import {
  StatusCodeOk, StatusCodeCreated, StatusCodeBadRequest, StatusCodeNotFound
} from '../helpers/statusTemp';
import Database from '../db/db';

const Datetime = createdOn();


export const entry = async (req, res) => {
  const entry = new Entry(Datetime, req.body.title, req.body.description);
  await Database.addEntry(entry);

  return res.status(StatusCodeCreated).json(new Respond(StatusCodeCreated, 'entry successfully created ', entry, null).reply());
};


export const update = async (req, res) => {
  const { entryId } = req.params;
  const { title, description } = req.body;
  if (isNaN(entryId)) {
    return res.status(StatusCodeBadRequest).json(new Respond(StatusCodeBadRequest, `EntryId ${entryId} should be an integer`, null).reply());
  }

  const oneEntry = await Database.updateEntry(req.body.title, req.body.description, req.params.entryId);
  if (!oneEntry) {
    return res.status(StatusCodeNotFound).json(new Respond(StatusCodeNotFound, `Entry with Id ${entryId} was  not found`, null).reply());
  }
  oneEntry.title = title;
  oneEntry.description = description;
  const data = oneEntry.rows[0];
  return res.status(StatusCodeOk).json(new Respond(StatusCodeOk, 'Entry edited successfully', data, null).reply());
};


export const remove = async (req, res) => {
  const removes = await Database.deleteEntry('entries', req.params.entryId);
  if (removes) {
    return res.status(StatusCodeOk).json(new Respond(StatusCodeOk, 'entry successfully deleted', null).reply());
  }
};


export const entryElement = async (req, res) => { const entries = await Database.selectAll('entries'); res.status(StatusCodeOk).json(new Respond(StatusCodeOk, 'Get Whole Dairy Entry', entries.rows.reverse(), null).reply()); };
export const getEntryById = async (req, res) => {
  const byid = await Database.selectBy('entries', 'entryId', req.params.entryId);
  if (byid.rows[0]) {
    return res.status(StatusCodeOk).json(new Respond(StatusCodeOk, 'Get entry By Specific Id', byid.rows[0], null).reply());
  }
  return res.status(StatusCodeNotFound).send(new Respond(StatusCodeNotFound, 'No record found ', null).reply());
};
