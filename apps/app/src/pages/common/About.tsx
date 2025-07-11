import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold text-center mb-5">Lorem Ipsum</h1>

          <div className="card border-0">
            <div className="card-body p-5">
              <h2 className="h3 mb-4">Lorem ipsum dolor sit amet</h2>

              <p className="lead mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <p className="mb-4">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>

              <p className="mb-4">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>

              <h3 className="h4 mb-3">Lorem ipsum dolor</h3>
              <p className="mb-4">
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit.
              </p>

              <h3 className="h4 mb-3">Lorem ipsum</h3>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">• Lorem ipsum dolor sit amet</li>
                <li className="mb-2">• Consectetur adipiscing elit</li>
                <li className="mb-2">• Sed do eiusmod tempor</li>
                <li className="mb-2">• Incididunt ut labore</li>
              </ul>

              <p className="mb-0">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
