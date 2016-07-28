import Promise from 'bluebird';
import FileAPI from 'fileapi';

const IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

export const THUMBNAIL_WIDTH = 100;
export const THUMBNAIL_HEIGHT = 100;

export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_START = 'FILE_UPLOAD_START';
export const FILE_UPLOAD_COMPLETE = 'FILE_UPLOAD_COMPLETE';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';

export function getThumbnails(imageFiles) {
  return Promise.all(
    imageFiles.map(getImageThumbnail)
  );
}

function getImageThumbnail(imageFile) {
  return new Promise((resolve, reject) => {
    FileAPI.Image(imageFile)
    .preview(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)
    .get((err, canvas) => {
      if (err) reject(err);

      resolve({
        dataURL: canvas.toDataURL(),
        file: imageFile
      });
    });
  });
}

function uploadFile(dispatch, url, file, data) {
  return new Promise(resolve => {
    FileAPI.upload({
      data: {
        title: data.title,
        caseId: data.caseId,
        fileType: data.fileType,
        user: data.user
      },
      files: {
        file
      },
      complete: resolve,
      fileprogress: (...args) => dispatch(fileProgress(...args)),
      filecomplete: (...args) => dispatch(fileComplete(...args, data)),
      url
    });
  });
}

export function uploadStart(dispatch, url, file, data) {
  return {
    type: FILE_UPLOAD_START,
    payload: {
      promise: uploadFile(dispatch, url, file, data)
    }
  };
}

function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

export function fileProgress(event, file, fileType) {
  if (event.loaded === 0) event.loaded = 1;

  const progress = event.loaded / event.total * 100;

  return {
    type: FILE_UPLOAD_PROGRESS,
    payload: { file, fileType, progress }
  };
}

export function fileComplete(error, xhr, file, options, data) {
  if (error) {
    return {
      type: FILE_UPLOAD_ERROR,
      payload: { file, error }
    };
  }

  return {
    type: FILE_UPLOAD_COMPLETE,
    payload: {
      file,
      data
    }
  };
}

export function filterAllowedFiles(payload, allowedFileTypes) {
  const allowedFilter = new RegExp(`${allowedFileTypes.join('|')}$`, 'i');

  return new Promise(resolve => {
    if (payload instanceof Event) FileAPI.getFiles(payload, file => allowedFilter.test(file.type), resolve);
    else FileAPI.filterFiles(payload, file => allowedFilter.test(file.type), resolve);
  });
}

export function filterUploadFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) FileAPI.getFiles(payload, isImage, resolve);
    else FileAPI.filterFiles(payload, isImage, resolve);
  });
}
