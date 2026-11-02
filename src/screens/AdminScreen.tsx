import { View, Text, Pressable } from "react-native";
import { adminStyles } from '../styles/AdminScreenStyle';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from "@react-navigation/native";
function Header() {
  const navigation = useNavigation<any>();
  return (
    <View style={adminStyles.header}>
      <View>
        <Text style={adminStyles.welcomeText}>Welcome back {'\n'} Admin</Text>

      </View>
      <Pressable style={adminStyles.profileButton} onPress={()=> navigation.navigate('AdminProfile')}>
        <Text style={adminStyles.profileLetter}>A</Text>
      </Pressable>
    </View>
  );
}

function Summary() {
  return (
    <View style={adminStyles.row}>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>4</Text>
        <Text>Desks</Text>
      </View>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>4</Text>
        <Text>Connected</Text>
      </View>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>0</Text>
        <Text>Offline</Text>
      </View>
    </View>
  );
}

function WaitingUsers() {
  const navigation = useNavigation<any>();
  return (
    <Pressable style={adminStyles.waitingBanner} onPress={() => navigation.navigate('New Users')}>
      <Text style={adminStyles.waitingText}>1 new user waiting for approval</Text>
      <Text style={adminStyles.waitingText}>Review</Text>
    </Pressable>
  );
}

function ManageButtons() {
  const navigation = useNavigation<any>();
  return (
    <View>
      <View style={adminStyles.row}>
        <Pressable style={adminStyles.manageButton} onPress={() => navigation.navigate('All Desks')}>
          <Text style={adminStyles.manageText}>All desks</Text>
        </Pressable>
        <Pressable style={adminStyles.manageButton} onPress={() => navigation.navigate('Reported')}>
          <Text style={adminStyles.manageText}>Reported issues</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function AdminScreen() {
  const { logout } = useAuth();
  return (
    <View style={adminStyles.container}>
      <Header />
      <Summary />
      <WaitingUsers />
      <ManageButtons />

      <Pressable style={adminStyles.liftButton} onPress={() => console.log('Lift all tables')}>
        <Text style={adminStyles.liftText}>Lift all tables</Text>
      </Pressable>

      <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
      </Pressable>
    </View>
  );
}