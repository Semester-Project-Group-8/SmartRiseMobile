import { View, Text, Pressable } from "react-native";
import { adminStyles } from '../styles/AdminScreenStyle';
import { getPendingUsers, getUserById, getDesks, getUsers, setAllDeskHeights } from '../services/api';
import { User } from '../types/user';
import { Desk } from '../types/desk';

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

function Summary( { desks }: { desks: Desk[]}) {

  const connectedDesks = desks.filter(desk => desk.isConnected);
  const offlineDesks = desks.filter(desk => !desk.isConnected);

  return (
    <View style={adminStyles.row}>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>{desks.length}</Text>
        <Text>Desks</Text>
      </View>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>{connectedDesks.length}</Text>
        <Text>Connected</Text>
      </View>
      <View style={adminStyles.summaryCard}>
        <Text style={adminStyles.summaryNumber}>{offlineDesks.length}</Text>
        <Text>Offline</Text>
      </View>
    </View>
  );
}

function WaitingUsers({ pendingUsers }: { pendingUsers: User[] }) {
   const navigation = useNavigation<any>();
  return (
    <Pressable style={adminStyles.waitingBanner} onPress={() =>navigation.navigate('New Users')}>
      <Text style={adminStyles.waitingText}>{pendingUsers.length} new users waiting for approval</Text>
      <Text style={adminStyles.waitingText}>Review</Text>
    </Pressable>
    )
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

  const userId = 'user-003';

  const user = getUserById(userId); 
  const users = getUsers();
  const pendindUsers: User[] = getPendingUsers();
  const desks: Desk[] = getDesks();

  const { logout } = useAuth();
  return (
    <View style={adminStyles.container}>
      <Header />
      <Summary desks={desks}/>
      <WaitingUsers pendingUsers={pendindUsers}/>
      <ManageButtons />

      <Pressable style={adminStyles.liftButton} onPress={() => {setAllDeskHeights(140)}}>
        <Text style={adminStyles.liftText}>Lift all tables</Text>
      </Pressable>

      <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
      </Pressable>
    </View>
  );
}