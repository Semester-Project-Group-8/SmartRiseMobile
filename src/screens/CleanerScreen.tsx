import { View, Text, Pressable } from "react-native";
import { cleanerStyles } from "../styles/CleanerScreenStyle";

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
  return (
    <View style={cleanerStyles.container}>
      <Header></Header>
      <Pressable style={cleanerStyles.button} onPress={() => console.log('Login pressed')}>
        <Text style={cleanerStyles.buttonText}>Lift up all tables</Text>
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