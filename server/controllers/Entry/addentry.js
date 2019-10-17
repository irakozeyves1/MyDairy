/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import { Entry, entries } from '../../models/entry.model';
import createdOn from '../../helpers/timestamp';

const Datetime = createdOn();

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
