import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { cleanerStyles } from "../styles/CleanerScreenStyle";
import { setAllDeskHeights } from "../services/api";

import { useAuth } from '../context/AuthContext';

function Header() {
  return (
    <View style={cleanerStyles.header}>
      <Text style={cleanerStyles.title}>Welcome</Text>
      <Text style={cleanerStyles.subtitle}>
        Have a good shift!
      </Text>
    </View>
  );
}

export default function CleanerScreen() {
  const { logout } = useAuth();
  const [lifting, setLifting] = useState(false);

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
    <View style={cleanerStyles.container}>
      <Header></Header>
      <Pressable
        style={[cleanerStyles.button, lifting && { opacity: 0.6 }]}
        onPress={handleLift}
        disabled={lifting}
      >
        <Text style={cleanerStyles.buttonText}>{lifting ? 'Lifting...' : 'Lift up all tables'}</Text>
      </Pressable>
      <Pressable onPress={logout} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#b91c1c', fontWeight: '600' }}>Log out</Text>
      </Pressable>
      <Footer></Footer>
    </View>
  )
}

function Footer() {
  return (
    <View style={cleanerStyles.footer}>
      <Text style={cleanerStyles.footerText}>
        If the tables don&apos;t lift or the button isn&apos;t working, please contact your admin.
      </Text>
    </View>
  );
}
