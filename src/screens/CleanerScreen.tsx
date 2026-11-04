import { View, Text, Pressable } from "react-native";
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
  return (
    <View style={cleanerStyles.container}>
      <Header></Header>
      <Pressable style={cleanerStyles.button} onPress={() => {setAllDeskHeights(140)}}>
        <Text style={cleanerStyles.buttonText}>Lift up all tables</Text>
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
        If the tables don't lift or the button isn't working, please contact your admin.
      </Text>
    </View>
  );
}