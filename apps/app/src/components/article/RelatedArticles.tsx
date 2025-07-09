import React from 'react';

interface RelatedArticlesProps {
  relatedIds: number[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedIds }) => {
  return (
    <>
      <h5 className="fw-semibold">Related articles</h5>
      <ul className="list-unstyled">
        {relatedIds.map(id => (
          <li className="mb-3" key={id}>
            <h6 className="mb-1 fw-bold">Lorem ipsum{id}</h6>
            <p className="mb-0 text-muted small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisl.
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
