/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import { Entry, entries } from '../../models/entry.model';
import createdOn from '../../helpers/timestamp';

const Datetime = createdOn();

// create entry

export const entry = (req, res) => {
  const entry = new Entry(entries.length + 1, Datetime, req.body.title, req.body.description);
  entries.push(entry);

  return res.status(200).send({
    status: 200,
    data: {
      message: 'entry successfully created',
      entry,
    },
  });
};

// update entry
export const update = (req, res) => {
  const { entryId } = req.params;
  const { title, description } = req.body;
  if (isNaN(entryId)) {
    return res.status(400).send({
      status: 400,
      error: `EntryId ${entryId} should be an integer`,
    });
  }
  const oneEntry = entries.find((entry) => entry.id == entryId);
  if (!oneEntry) {
    return res.status(404).send({
      status: 404,
      error: `Entry with Id ${entryId} was  not found`,
    });
  }
  oneEntry.title = title;
  oneEntry.description = description;
  return res.status(201).send({
    status: 201,
    message: 'Entry created successfully',
    data: oneEntry,
  });
};

// remove an entry
export const remove = (req, res) => {
  const removes = entries.findIndex((entry) => entry.id == req.params.entryId);
  if (removes > -1) {
    entries.splice(removes, 1);
    return res.status(200).send({
      status: 200,
      data: {
        message: 'entry successfully deleted',
      },
    });
  }
};

export const entryElement = (req, res) => {
  return res.status(200).send({
    status: 200,
    data: entries,
  });
};
