import { View, Text, Pressable } from "react-native";
import { adminStyles } from '../styles/AdminScreenStyle';
import { getPendingUsers, getUserById, getDesks, getUsers, setAllDeskHeights } from '../services/api';
import { User } from '../types/user';
import { Desk } from '../types/desk';

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
  return (
    <Pressable style={adminStyles.waitingBanner} onPress={() => console.log('Approve users')}>
      <Text style={adminStyles.waitingText}>{pendingUsers.length} new users waiting for approval</Text>
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

  const userId = 'user-003';

  const user = getUserById(userId); 
  const users = getUsers();
  const pendindUsers: User[] = getPendingUsers();
  const desks: Desk[] = getDesks();

  return (
    <View style={adminStyles.container}>
      <Header />
      <Summary desks={desks}/>
      <WaitingUsers pendingUsers={pendindUsers}/>
      <ManageButtons />

      <Pressable style={adminStyles.liftButton} onPress={() => {setAllDeskHeights(140)}}>
        <Text style={adminStyles.liftText}>Lift all tables</Text>
      </Pressable>

      <Pressable style={adminStyles.logoutButton} onPress={() => console.log('Log out')}>
        <Text style={adminStyles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}