import React, { useState, useEffect } from "react";

function PaginationTabsComponent({ currentPage, setCurrentPage, lastPage }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [goToPage, setGoToPage] = useState(1);

    React.useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize)
    })

    function renderTabs() {

        let skip = 0;

        let maxItems = Math.ceil(windowWidth / 90);

        let lastPageInView = false;

        if (maxItems > lastPage) {
            maxItems = lastPage;
        }

        let startSkip = Math.floor(maxItems / 2) - 1;

        skip = currentPage > startSkip ? currentPage - startSkip : 0;

        let tabs = [];

        if (currentPage + 1 == 1) {
            tabs.push(<li class="page-item"><div className="page-link bg-primary text-light" onClick={() => setCurrentPage(0)}>1</div></li>);
        }
        else {
            tabs.push(<li class="page-item"><div className="page-link" onClick={() => setCurrentPage(0)}>1</div></li>);
        }

        if (lastPage != 1) {

            if (maxItems == lastPage) {
                skip = 0;
                lastPageInView = true;
            }
            else {
                if (skip > 0) {
                    tabs.push(<li class="page-item"><div className="page-link" >...</div></li>);
                    maxItems--;
                }

                if (maxItems + skip >= lastPage) {
                    skip = lastPage - maxItems - 1;
                    lastPageInView = true;
                    maxItems++;
                }
            }

            for (let i = 2 + skip; i < maxItems + skip; i++) {
                if (i == currentPage + 1) {
                    tabs.push(<li class="page-item"><div className="page-link bg-primary text-light" onClick={() => setCurrentPage(i - 1)}>{i}</div></li>)
                } else {
                    tabs.push(<li class="page-item"><div className="page-link" onClick={() => setCurrentPage(i - 1)}>{i}</div></li>);
                }
            }

            if (!lastPageInView) {
                tabs.push(<li class="page-item"><div className="page-link" >...</div></li>);
            }

            if (currentPage + 1 == lastPage) {
                tabs.push(<li class="page-item"><div className="page-link bg-primary text-light" onClick={() => setCurrentPage(lastPage - 1)}>{lastPage}</div></li>);
            }
            else {
                tabs.push(<li class="page-item"><div className="page-link" onClick={() => setCurrentPage(lastPage - 1)}>{lastPage}</div></li>);
            }
        }
        tabs.push(<li class="page-item"><div className="page-link" onClick={() => currentPage + 1 < lastPage ? setCurrentPage(currentPage + 1) : null}>Proxima</div></li>)

        return (
            <div className="d-flex flex-column my-2">
                <ul class="pagination mx-auto my-0">
                    <li class="page-item"><div className="page-link" onClick={() => currentPage > 0 ? setCurrentPage(currentPage - 1) : null}>Anterior</div></li>
                    {tabs}
                </ul>
                <br />
                <div className="m-auto">
                    <input type="number" value={goToPage} style={{ width: 60 }} min={1} max={lastPage} onChange={(e) => setGoToPage(e.target.value)}></input>
                    <button className="btn btn-primary mx-2" onClick={() => (goToPage > 0 && goToPage <= lastPage) ? setCurrentPage(parseInt(goToPage - 1)) : setGoToPage(1)}>Ir para página</button>
                </div>
            </div>

        );
    }

    return (
        <nav aria-label="Page navigation example">
            {renderTabs()}
        </nav>
    )
}

export default PaginationTabsComponent;