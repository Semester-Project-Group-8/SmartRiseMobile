import { View, Text, Pressable } from 'react-native';
import { useState } from "react";
import { AdminProfileScreenStyle } from '../styles/AdminProfileScreenStyle';
import { usePresets } from '../context/PressetsContext';
export default function AdminProfileScreen() {
    return (
        <View>
            <Header />
            <Account />
            
        </View>
    );
}

function Header() {
    return (
        <View style={AdminProfileScreenStyle.Header}>
            <Text style={AdminProfileScreenStyle.ProfileLogo}>A</Text>
            <Text style={AdminProfileScreenStyle.ProfileName}>Admin Name</Text>
            <Text style={AdminProfileScreenStyle.ProfileType}>Admin</Text>
        </View>
    );
}

function Account() {
    return (
        <View>
            <Text style={AdminProfileScreenStyle.Text}>Account</Text>
            <View style={AdminProfileScreenStyle.Table}>
                <View style={AdminProfileScreenStyle.Row}>
                    <Text>Name</Text>
                    <Text>Admin's Name</Text>
                </View>
                <View style={AdminProfileScreenStyle.Row}>
                    <Text>Preffered Desk</Text>
                    <Text>Admin's PD</Text>
                </View>
                <View style={AdminProfileScreenStyle.Row}>
                    <Text>Department</Text>
                    <Text>Admin's Depart.</Text>
                </View>
                <View style={AdminProfileScreenStyle.RowBottom}>
                    <Text>Date Of Birth</Text>
                    <Text>Admin's DOB</Text>
                </View>
            </View>
        </View>
    );
}
