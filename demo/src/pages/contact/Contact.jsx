import { Form, Link, useFetcher, useLoaderData } from 'react-router-dom';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
//import { getContact, updateContact } from '../contacts';

import {getContact, updateContact} from '../../apis/ContactApi';

// The contactDetailQuery function now doesn't use TypeScript types.
export const contactDetailQuery = (id) =>
  queryOptions({
    queryKey: ['contacts', 'detail', id],
    queryFn: async () => {
      const contact = await getContact(id);
      if (!contact) {
        throw new Response('', {
          status: 404,
          statusText: 'Not Found',
        });
      }
      return contact;
    },
  });

// The loader function is now written without TypeScript types.
export const loader =
  (queryClient) =>
  async ({ params }) => {
    if (!params.contactId) {
      throw new Error('No contact ID provided');
    }
    await queryClient.ensureQueryData(contactDetailQuery(params.contactId));
    return { contactId: params.contactId };
  };

// The action function is now written without TypeScript types.
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    if (!params.contactId) {
      throw new Error('No contact ID provided');
    }
    await updateContact(params.contactId, {
      favorite: formData.get('favorite') === 'true',
    });
    await queryClient.invalidateQueries({ queryKey: ['contacts'] });
    return null;
  };

export default function Contact() {
  const { contactId } = useLoaderData(); // No type casting here
  const { data: contact } = useSuspenseQuery(contactDetailQuery(contactId));

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Link to="edit" className="button">
            Edit
          </Link>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// The Favorite component is also simplified to remove TypeScript types.
function Favorite(contact) {
  const fetcher = useFetcher({ key: `contact:${contact.id}` });
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        title={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
