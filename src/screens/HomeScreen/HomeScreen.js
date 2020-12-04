import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Button, Text, Image, TextInput,  ScrollView, View, SafeAreaView, FlatList} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Transitioning, Transition } from 'react-native-reanimated'
import styles from './styles'
import { firebase } from '../../firebase/config'

const colors = {
    red: '#EC2379',
    blue: '#0070FF',
    gray: '#777777',
    white: '#ffffff',
    black: '#000000'
};

const stackSize = 4;
const ANIMATION_DURATION = 200;

const transition = (
    <Transition.Sequence>
      <Transition.Out
        type='slide-bottom'
        durationMs={ANIMATION_DURATION}
        interpolation='easeIn'
      />
      <Transition.Together>
        <Transition.In
          type='fade'
          durationMs={ANIMATION_DURATION}
          delayMs={ANIMATION_DURATION / 2}
        />
        <Transition.In
          type='slide-bottom'
          durationMs={ANIMATION_DURATION}
          delayMs={ANIMATION_DURATION / 2}
          interpolation='easeOut'
        />
      </Transition.Together>
    </Transition.Sequence>
  );
  
  const swiperRef = React.createRef();
  const transitionRef = React.createRef();

export default function HomeScreen() {
    const [ user, setUser ] = useState([]);
    const [index, setIndex] = useState([]);
    const users = firebase.firestore().collection('users');
    const onSwiped = () => {
        transitionRef.current.animateNextTransition();
        setIndex((index + 1) % user.length);
      };


    useEffect(() => {
        return users.onSnapshot(querySnapshot => {
          const userList = [];
          querySnapshot.forEach(doc => {
            const { fullName, userBio, image } = doc.data();
            userList.push({
              id: doc.id,
              fullName,
              userBio,
              image
            });
           
          });
          setUser(userList);
        });
      }, []);

    function Card ({user}){
        return (
         <View style={styles.card}>
            <Image source={{uri: user.image}} style={styles.cardImage}/>
        </View>)   
    }

    
    const CardDetails = ({ index }) => (
        <View key={user[index].id} style={{ alignItems: 'center' }}>
          <Text style={[styles.text, styles.heading]} numberOfLines={2}>
            {user[index].fullName}
          </Text>
          <Text style={[styles.text, styles.userBio]}>{user[index].userBio}</Text>
        </View>
    );

    //   const Item = ({ fullName }) => (
    //     <View style={styles.item}>
    //       <Text style={styles.fullName}>{fullName}</Text>

    //     </View>
    //   );

    return (
        
        <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={user}
          renderItem={({ item }) => (
            <Item fullName={item.fullName} />)}
          keyExtractor={item => item.id}
        /> */}

     <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={user}
          cardIndex={index}
          renderCard={card => <Card card={card} />}
          infinite
          backgroundColor={'transparent'}
          onSwiped={onSwiped}
          onTapCard={() => swiperRef.current.swipeLeft()}
          cardVerticalMargin={50}
          stackSize={stackSize}
          stackScale={10}
          stackSeparation={14}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: colors.red,
                  borderColor: colors.red,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: colors.blue,
                  borderColor: colors.blue,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20
                }
              }
            }
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={styles.bottomContainerMeta}
        >
          <CardDetails index={index} />
        </Transitioning.View>
        </View>
        <View style={styles.bottomContainerButtons}></View>
      </SafeAreaView>
      );
 }