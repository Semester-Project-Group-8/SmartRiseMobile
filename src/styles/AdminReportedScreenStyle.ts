import { StyleSheet } from 'react-native';

export const AdminReportedScreenStyle = StyleSheet.create({
    Headertext: {
        backgroundColor: '#dc2626',
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
        backgroundColor: "#fef2f2",
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 18,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#fecaca",
        borderLeftWidth: 6,
        borderLeftColor: "#dc2626",
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
        color: "#b91c1c",
    },

    Divider: {
        height: 1,
        backgroundColor: "#fecaca",
        marginVertical: 6,
    },

    Label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#dc2626",
    },

    IssueText: {
        fontSize: 16,
        color: "#7f1d1d",
    }
});
