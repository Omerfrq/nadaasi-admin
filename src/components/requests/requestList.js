import React from 'react';
import RequestItem from './requestItem';
export default function RequestLists({ requests }) {
  return (
    <>
      {requests.reverse().map((request) => (
        <RequestItem key={request._id} request={request} />
      ))}
    </>
  );
}
