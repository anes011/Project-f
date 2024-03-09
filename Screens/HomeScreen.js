import { View, Text, ScrollView } from 'react-native';
import HomeTopSection from '../Components/HomeTopSection';
import Categories from '../Components/Categories';
import Restaurants from '../Components/Restaurants';

const HomeScreen = () => {
  return (
    <View style={[{flex: 1}, {padding: 20}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeTopSection />
          <Categories />
          <Restaurants />
        </ScrollView>
    </View>
  )
};

export default HomeScreen;