import React, { useEffect, useState } from 'react';

const BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function SimpleModal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [rawData, setRawData] = useState(null);

  const endpoint = `${BASE}/teams/`;

  const fetchData = () => {
    console.log('Endpoint (Teams):', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Teams:', data);
        const payload = data && data.results ? data.results : data;
        setItems(payload || []);
        setRawData(data);
      })
      .catch((err) => console.error('Teams fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const columns = items && items.length ? Object.keys(items[0]) : [];

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Teams</h3>
        <div className="mb-2">
          <button className="btn btn-primary me-2" onClick={fetchData} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
          <button className="btn btn-outline-secondary me-2" onClick={() => setShowRaw(true)}>Show Raw</button>
          <a className="btn btn-link" href={endpoint} target="_blank" rel="noreferrer">Open API</a>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>{columns.length ? columns.map((c) => <th key={c}>{c}</th>) : <th>No data</th>}</tr>
            </thead>
            <tbody>
              {items && items.length ? items.map((row, idx) => (
                <tr key={idx} style={{cursor: 'pointer'}} onClick={() => { setRawData(row); setShowRaw(true); }}>
                  {columns.map((c) => <td key={c}>{String(row[c] === undefined || row[c] === null ? '' : row[c])}</td>)}
                </tr>
              )) : <tr><td colSpan={columns.length || 1}>{loading ? 'Loading...' : 'No teams found'}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <SimpleModal show={showRaw} onClose={() => setShowRaw(false)} title="Teams JSON">
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(rawData || items, null, 2)}</pre>
      </SimpleModal>
    </div>
  );
}
