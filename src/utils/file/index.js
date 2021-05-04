export const GetFileTypeImage = (file_type_name) => {
  switch (file_type_name.toString().toLowerCase()) {
    case "word":
      return "../images/file_type_icons/doc.png";
    case "excel":
      return "../images/file_type_icons/xls.png";
    case "powerpoint":
      return "../images/file_type_icons/ppt.png";
    case "video":
      return "../images/file_type_icons/mp4.png";
    case "audio":
      return "../images/file_type_icons/mp3.png";
    case "pdf":
      return "../images/file_type_icons/pdf.png";
    case "zip":
      return "../images/file_type_icons/zip.png";
    case "text":
      return "../images/file_type_icons/txt.png";
    case "png":
      return "../images/file_type_icons/png.png";
    case "css":
      return "../images/file_type_icons/css.png";
    case "csv":
      return "../images/file_type_icons/csv.png";
    case "exe":
      return "../images/file_type_icons/exe.png";
    case "html":
      return "../images/file_type_icons/html.png";
    case "javascript":
      return "../images/file_type_icons/javascript.png";
    case "json":
      return "../images/file_type_icons/json-file.png";
    case "svg":
      return "../images/file_type_icons/svg.png";
    case "xml":
      return "../images/file_type_icons/xml.png";
    default:
      return "../images/file_type_icons/file.png";
  }
};

export const GetTypeFromExt = (fname) => {
  switch (fname.split(".").pop().toLowerCase()) {
    case "doc":
    case "docx":
      return "word";
    case "xls":
    case "xlxs":
      return "excel";
    case "ppt":
    case "pptx":
      return "powerpoint";
    case "mp4":
    case "webm":
    case "avi":
    case "mpeg":
    case "mpv":
    case "m4v":
    case "mov":
    case "flv":
      return "video";
    case "m4a":
    case "flac":
    case "mp3":
    case "wav":
    case "aac":
      return "audio";
    case "pdf":
      return "pdf";
    case "zip":
    case "gzip":
    case "rar":
    case "tar":
    case "7z":
      return "zip";
    case "txt":
    case "rtf":
    case "tex":
      return "text";
    case "png":
      return "png";
    case "css":
    case "scss":
    case "sass":
      return "css";
    case "csv":
      return "csv";
    case "exe":
      return "exe";
    case "html":
      return "html";
    case "js":
      return "javascript";
    case "json":
      return "json";
    case "svg":
      return "svg";
    case "xml":
      return "xml";
    default:
      return "others";
  }
};
