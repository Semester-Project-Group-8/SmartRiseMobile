import { View, Text, Pressable, ScrollView } from "react-native";
import { AdminAllDesksScreenStyle } from "../styles/AdminAllDesksScreenStyle";
export default function AllDesks() {
    return (
        <ScrollView>
            <Text style={AdminAllDesksScreenStyle.Headertext}>Currently you have 4 Desks</Text>
            <Desks />
        </ScrollView>
    );
}

function Desks() {
    return (
        <View>
            <View style={AdminAllDesksScreenStyle.Container}>
                <Text style={AdminAllDesksScreenStyle.DeskName}>Desk 1</Text>
                <View style={AdminAllDesksScreenStyle.Divider} />
                <Text style={AdminAllDesksScreenStyle.Label}>Assigned to</Text>
                <View style={AdminAllDesksScreenStyle.UserRow}>
                    <Text style={AdminAllDesksScreenStyle.ProfileLogo}>U</Text>
                    <Text style={AdminAllDesksScreenStyle.UserName}>User Name</Text>
                </View>
                <Pressable style={({ pressed }) => [AdminAllDesksScreenStyle.EditButton, pressed && AdminAllDesksScreenStyle.EditButtonPressed]}>
                    <Text style={AdminAllDesksScreenStyle.EditButtonText}>Edit Preferred User</Text>
                </Pressable>
            </View>
            <View style={AdminAllDesksScreenStyle.Container}>
                <Text style={AdminAllDesksScreenStyle.DeskName}>Desk 2</Text>
                <View style={AdminAllDesksScreenStyle.Divider} />
                <Text style={AdminAllDesksScreenStyle.Label}>Assigned to</Text>
                <View style={AdminAllDesksScreenStyle.UserRow}>
                    <Text style={AdminAllDesksScreenStyle.ProfileLogo}>U</Text>
                    <Text style={AdminAllDesksScreenStyle.UserName}>User Name</Text>
                </View>
                <Pressable style={({ pressed }) => [AdminAllDesksScreenStyle.EditButton, pressed && AdminAllDesksScreenStyle.EditButtonPressed]}>
                    <Text style={AdminAllDesksScreenStyle.EditButtonText}>Edit Preferred User</Text>
                </Pressable>
            </View>
            <View style={AdminAllDesksScreenStyle.Container}>
                <Text style={AdminAllDesksScreenStyle.DeskName}>Desk 3</Text>
                <View style={AdminAllDesksScreenStyle.Divider} />
                <Text style={AdminAllDesksScreenStyle.Label}>Assigned to</Text>
                <View style={AdminAllDesksScreenStyle.UserRow}>
                    <Text style={AdminAllDesksScreenStyle.ProfileLogo}>U</Text>
                    <Text style={AdminAllDesksScreenStyle.UserName}>User Name</Text>
                </View>
                <Pressable style={({ pressed }) => [AdminAllDesksScreenStyle.EditButton, pressed && AdminAllDesksScreenStyle.EditButtonPressed]}>
                    <Text style={AdminAllDesksScreenStyle.EditButtonText}>Edit Preferred User</Text>
                </Pressable>
            </View>
            <View style={AdminAllDesksScreenStyle.Container}>
                <Text style={AdminAllDesksScreenStyle.DeskName}>Desk 4</Text>
                <View style={AdminAllDesksScreenStyle.Divider} />
                <Text style={AdminAllDesksScreenStyle.Label}>Assigned to</Text>
                <View style={AdminAllDesksScreenStyle.UserRow}>
                    <Text style={AdminAllDesksScreenStyle.ProfileLogo}>U</Text>
                    <Text style={AdminAllDesksScreenStyle.UserName}>User Name</Text>
                </View>
                <Pressable style={({ pressed }) => [AdminAllDesksScreenStyle.EditButton, pressed && AdminAllDesksScreenStyle.EditButtonPressed]}>
                    <Text style={AdminAllDesksScreenStyle.EditButtonText}>Edit Preferred User</Text>
                </Pressable>
            </View>
        </View>
    );
}
