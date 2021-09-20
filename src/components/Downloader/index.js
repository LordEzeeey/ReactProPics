import React, { useState, useEffect } from "react";
import "./index.css";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Downloader = ({ posts = [], remove }) => {
  return (
    <div className="downloader">
      <div className="card">
        <div className="card-header">File Downloader</div>
        <ul className="list-group list-group-flush">
          {posts.map((post, id) => (
            <DownloadItem
              key={id}
              removefile={() => remove(post.downloadId)}
              {...post}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const DownloadItem = ({ caption, removefile, post, username }) => {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });

  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        });
      },
    };
    axios
      .get(post, {
        responseType: "blob",
        ...options,
      })
      .then(function (response) {
        console.log(response);

        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", caption);
        document.body.appendChild(link);
        link.click();

        setDownloadInfo((info) => ({
          ...info,
          complete: true,
        }));

        setTimeout(() => {
          removefile();
        }, 4000);
      });
  }, []);

  const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 d-Flex">
          <div className="d-inline font-weight-bold text-truncate">
            {caption}
          </div>

          <div className="d-inline ml-2">
            <small>
              {downloadInfo.loaded > 0 && 
                <div>
                  <span className="text-success">
                    {formatBytes(downloadInfo.loaded)}
                  </span>
                  / {formatBytes(downloadInfo.total)}
                </div>
              }

              {downloadInfo.loaded === 0 && <div>Propics initializing</div>}
            </small>
          </div>
          <div className="d-inline ml-2 ml-auto">
          { downloadInfo.completed && 
            <span className="text-success">
              Completed{""}
              <FontAwesomeIcon icon="check-circle" />
            </span>
          }
          </div>
        </div>
        <div className="col-12 mt-2">
          <ProgressBar
            variant="success"
            now={downloadInfo.progress}
            striped={true}
            label={`${downloadInfo.progress}%`}
          />
        </div>
      </div>
    </li>
  );
};

export default Downloader;
