import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TextInput, Image, StyleSheet } from "react-native";
import ButtonStyle from "./components/ButtonStyle";
import TextStyle from "./components/TextStyle";
import { heightPercentage, widthPercentage } from "./Global/Dimensions";
import Layout from "./Global/Layout";
import ytdl from "react-native-ytdl";
import { getLinkPreview } from "link-preview-js";
import * as MediaLibrary from "expo-media-library";
import downloadFileHandler from "./function/DownloadHandler";
import { primary, secondaryColor } from "./Global/Color";
import NetInfo from "@react-native-community/netinfo";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [isOffline, setIsOffline] = useState(false);
  const [inputUrl, setInputUrl] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [downloadInprogress, setdownloadInprogress] = useState(false);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);

  useEffect(() => {
    const getNetInfo = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected || !state.isInternetReachable);
    });
    return () => getNetInfo();
  }, [isOffline]);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted" || status === "denied") {
        openAppSettings();
      }
    };
    askPermission();
    setInputUrl("");
  }, []);

  useEffect(() => {
    setIsDataAvaliable(false);
    setTitle("");
    setImage("");
    setInvalidURL(false);
    if (inputUrl) {
      const urlValidate = ytdl.validateURL(inputUrl);
      if (!urlValidate) {
        setInvalidURL(true);
        return;
      } else {
        getLinkPreview(inputUrl).then((data) => {
          setImage(data.images[0]);
          setTitle(data.title);
          setIsDataAvaliable(true);
        });
      }
    }
  }, [inputUrl]);

  const startDownload = async () => {
    if (!inputUrl || invalidURL) {
      alert("invalid URL");
      return;
    }
    const urls = await ytdl(inputUrl, { filter: "audioonly" });
    const videoUrl = urls[0].url;
    const titleVieo = `${title}.mp3`;
    downloadFileHandler(videoUrl, titleVieo, setdownloadInprogress);
  };

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      {isOffline ? (
        <View style={style.noInernet}>
          <Feather
            name="wifi-off"
            size={50}
            color="black"
            style={{ marginHorizontal: widthPercentage(2) }}
          />
          <TextStyle>No Internet connection</TextStyle>
        </View>
      ) : (
        <View>
          <View style={style.imageContainer}>
            {isDataAvaliable && (
              <>
                <Image source={{ uri: image }} style={style.image} />
                <TextStyle style={{ fontSize: 18 }}>{title}</TextStyle>
              </>
            )}
          </View>
          <TextInput
            style={style.textInput}
            onChangeText={setInputUrl}
            value={inputUrl}
            placeholder="input url.."
            placeholderTextColor={"gray"}
          />
          <ButtonStyle
            onPress={startDownload}
            disabled={downloadInprogress}
            style={{
              backgroundColor:
                (downloadInprogress && secondaryColor) || primary,
            }}
          >
            {downloadInprogress ? (
              <TextStyle style={{ color: "#FFF" }}>
                Download inprogress...
              </TextStyle>
            ) : (
              <TextStyle style={{ color: "#FFF" }}>Download</TextStyle>
            )}
          </ButtonStyle>
        </View>
      )}
      <StatusBar style="light" />
    </Layout>
  );
}

const style = StyleSheet.create({
  textInput: {
    height: heightPercentage(8),
    backgroundColor: "#f3f3f3",
    marginVertical: heightPercentage(2),
    borderRadius: 30,
    color: "gray",
    textAlign: "center",
    fontSize: 18,
  },
  imageContainer: {
    height: heightPercentage(40),
    marginTop: heightPercentage(5),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: heightPercentage(30),
    width: widthPercentage(95),
    marginVertical: heightPercentage(2),
  },
  noInernet: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
