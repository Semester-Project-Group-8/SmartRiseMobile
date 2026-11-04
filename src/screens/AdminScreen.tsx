import { View, Text, Pressable } from "react-native";
import { adminStyles } from '../styles/AdminScreenStyle';
import { useAuth } from '../context/AuthContext';
function Header() {
  return (
    <View style={adminStyles.header}>
      <View>
        <Text style={adminStyles.welcomeText}>Welcome back {'\n'} Admin</Text>

      </View>
      <Pressable style={adminStyles.profileButton} onPress={() => console.log('Profile')}>
        <Text style={adminStyles.profileLetter}>A</Text>
      </Pressable>
    </View>
  );
}

function Summary() {
  return (
    <View style={adminStyles.row}>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>12</Text>
        <Text>Desks</Text>
      </View>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>11</Text>
        <Text>Connected</Text>
      </View>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>1</Text>
        <Text>Offline</Text>
      </View>
    </View>
  );
}

function WaitingUsers() {
  return (
    <Pressable style={adminStyles.waitingBanner} onPress={() => console.log('Approve users')}>
      <Text style={adminStyles.waitingText}>2 new users waiting for approval</Text>
      <Text style={adminStyles.waitingText}>Review</Text>
    </Pressable>
  );
}

function ManageButtons() {
  return (
    <View>
      <View style={adminStyles.row}>
        <Pressable style={adminStyles.manageButton} onPress={() => console.log('Users & desks')}>
          <Text style={adminStyles.manageText}>Users & desks</Text>
        </Pressable>
        <Pressable style={adminStyles.manageButton} onPress={() => console.log('Table + beacon')}>
          <Text style={adminStyles.manageText}>Table + beacon</Text>
        </Pressable>
      </View>
      <View style={adminStyles.row}>
        <Pressable style={adminStyles.manageButton} onPress={() => console.log('All desks')}>
          <Text style={adminStyles.manageText}>All desks</Text>
        </Pressable>
        <Pressable style={adminStyles.manageButton} onPress={() => console.log('Reported issues')}>
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