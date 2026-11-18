import { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { adminStyles } from '../styles/AdminScreenStyle';
import { getPendingUsers, getDesks, setAllDeskHeights } from '../services/api';
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
      <Pressable style={adminStyles.profileButton} onPress={() => navigation.navigate('AdminProfile')}>
        <Text style={adminStyles.profileLetter}>A</Text>
      </Pressable>
    </View>
  );
}

function Summary({ desks }: { desks: Desk[] }) {
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
    <Pressable style={adminStyles.waitingBanner} onPress={() => navigation.navigate('New Users')}>
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
  const { logout } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [desks, setDesks] = useState<Desk[]>([]);
  const [error, setError] = useState('');
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    const loadDesks = async () => {
      try {
        setDesks(await getDesks());
      } catch (e) {
        setError((e as Error).message);
      }
    };
    const loadPendingUsers = async () => {
      try {
        setPendingUsers(await getPendingUsers());
      } catch (e) {
        setError((e as Error).message);
      }
    };
    loadDesks();
    loadPendingUsers();
  }, []);

  const handleLift = async () => {
    setLifting(true);
    try {
      await setAllDeskHeights(140);
      Alert.alert('Done', 'All tables are going up.');
    } catch (e) {
      Alert.alert('Could not lift the tables', (e as Error).message);
    } finally {
      setLifting(false);
    }
  };

  return (
    <View style={adminStyles.container}>
      <Header />
      {error !== '' && <Text style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</Text>}
      <Summary desks={desks} />
      <WaitingUsers pendingUsers={pendingUsers} />
      <ManageButtons />

      <Pressable
        style={[adminStyles.liftButton, lifting && { opacity: 0.6 }]}
        onPress={handleLift}
        disabled={lifting}
      >
        <Text style={adminStyles.liftText}>{lifting ? 'Lifting...' : 'Lift all tables'}</Text>
      </Pressable>

      <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
      </Pressable>
    </View>
  );
}
