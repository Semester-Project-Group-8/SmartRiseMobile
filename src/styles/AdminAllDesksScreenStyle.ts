import { StyleSheet } from 'react-native';

export const AdminAllDesksScreenStyle = StyleSheet.create({
    Headertext: {
        backgroundColor: '#2563eb',
        color: 'white',
        textAlign: 'center',
        margin: 15,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: 'bold',
    },

    Container: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 18,
        borderRadius: 20,
        gap: 6,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },

    DeskName: {
        fontSize: 18,
        fontWeight: "bold",
    },

    Divider: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 6,
    },

    Label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#6b7280",
    },

    UserRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },

    ProfileLogo: {
        width: 36,
        height: 36,
        borderRadius: 999,
        backgroundColor: '#2563eb',
        textAlign: 'center',
        lineHeight: 36,
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },

    UserName: {
        fontSize: 16,
    },

    EditButton: {
        borderRadius: 10,
        backgroundColor: '#2563eb',
        padding: 10,
        marginTop: 4,
    },

    EditButtonPressed: {
        backgroundColor: '#1d4ed8',
        transform: [{ scale: 0.97 }],
    },

    EditButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    }
});
