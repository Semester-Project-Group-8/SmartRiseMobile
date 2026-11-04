import { StyleSheet } from 'react-native';

export const UserProfileScreenStyle = StyleSheet.create({
    ProfileLogo: {
        width: 100,
        height: 100,
        borderRadius: 999,
        backgroundColor: '#2563eb',
        textAlign: 'center',
        lineHeight: 100,
        overflow: 'hidden',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },

    ProfileName: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },

    ProfileType: {
        borderRadius: 999,
        backgroundColor: '#2563eb',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
    },

    Header: {
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
        marginTop: 24,
    },

    Table: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        margin: 10,
        padding: 5,
    },

    Row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 10,
    },

    RowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    Text: {
        marginTop: 20,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10,
    },

    SizeChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },

    ChangeButton: {
        width: 30,
        height: 30,
        borderRadius: 999,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
    },

    ButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 20,
        includeFontPadding: false,
    },

    HeightText: {
        width: 60,
        textAlign: 'center',
    },

    SaveButton:{
        borderRadius: 10,
        backgroundColor: '#2563eb',
        margin: 15,
        padding:10,
    },

    SaveButtonPressed:{
        backgroundColor: '#1d4ed8',
        transform: [{ scale: 0.97 }],
    },

    SaveButtonText:{
        color:"#ffffff",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    }
});