import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const downloadFileHandler = async (videoUrl, titleVieo, downloadProgress) => {
  const fileUri = FileSystem.documentDirectory + titleVieo;
  try {
    downloadProgress(true);
    const res = await FileSystem.downloadAsync(videoUrl, fileUri);
    saveFile(res.uri);
    downloadProgress(false);
    alert("Download Finished");
  } catch (e) {
    console.log(e);
  }
};

const saveFile = async (uri) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync("Download");
    if (album === null) {
      await MediaLibrary.getAlbumAsync("Download");
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (e) {
    console.log(e);
  }
};

export default downloadFileHandler;
