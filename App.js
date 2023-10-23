
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  Share,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  GiphyContent,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaType,
  GiphySDK,
  GiphyVideoView,
} from '@giphy/react-native-sdk'

GiphySDK.configure({
  apiKey: 'Lk7Mq65FFIv73tBpHZhTdJbBGTZheK9j', // Android SDK key
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [media, setMedia] = useState(null)
  const [me2, setMe2] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TextInput
        autoFocus
        style={styles.textsearch}
        onChangeText={setSearchQuery}
        placeholder="Search..."
        value={searchQuery}
      />
      {!searchQuery &&(
        
      <View style={{width:"80%",alignSelf:"center"}}>
      <Text style={styles.textstyle}>Trending Gifs</Text>
      <GiphyGridView
        content={GiphyContent.trendingGifs()}
        cellPadding={20}
        spanCount={3}
        orientation='cover'
        style={{ height: windowHeight*0.8, marginTop: 24 }}
        onMediaSelect={(e)=>Share.share({
          message:`hey view this: ${e.nativeEvent.media.url}`,
        })}
      />
        </View>

      )}
    
     { searchQuery &&  (
        
        <View style={{width:"80%",alignSelf:"center"}}>
        <Text style={styles.textstyle}>Search Results</Text>
        <GiphyGridView
          content={GiphyContent.search({
            searchQuery: searchQuery,
            mediaType: GiphyMediaType.Video,
          })}
          cellPadding={20}
          spanCount={3}
          // orientation='cover'
          style={{ height: windowHeight*0.8, marginTop: 24 }}
          onMediaSelect={(e)=>Share.share({
            message:`hey view this: ${e.nativeEvent.media.url}`,
          })}
        />
          </View>
  
        )}
    
       {/* {media && (
        <ScrollView
          style={{
            aspectRatio: media.aspectRatio,
            maxHeight: 400,
            padding: 24,
            width: '100%',
          }}
        >
          <GiphyVideoView
            media={media}
            autoPlay={true}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}  */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textstyle:{
  textAlign:'center',
  color: '#000',
  fontSize:20
  },
  textsearch:{
  margin:10,
  borderWidth:1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
