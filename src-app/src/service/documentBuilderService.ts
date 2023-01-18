const HEADERS = {
  'Content-Type': 'application/json',
  'AD-Tenant': '-place-'
};
const data = {
  documentType: 'CREDIT_MEMO',
  encrypted: false,
  dataContentType: 'application/json',
  id: '60a13bf9-e59b-4863-9a20-a0956e76db6d'
};

function getPdfUrl() {
  return `/api/v1/documents/pdf`;
}

const DocumentBuilderService = () => {
  fetch(getPdfUrl(), {
    method: 'POST',
    headers: {
      ...HEADERS,
      Accept: 'application/json, application/pdf'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) return response.blob();
    // @ts-ignore
    throw new Error(response);
  });
};

export default DocumentBuilderService;
