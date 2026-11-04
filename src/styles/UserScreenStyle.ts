import { StyleSheet } from 'react-native';

export const userStyles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#2563eb',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',

    },

    profileIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#dbeafe',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileLetter: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2563eb',
    },

    DeskView: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#FFFF',
        padding: 20
    },

    CurrentDesk: {
        fontSize: 20,
    },


    deskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    ButtonConnect: {
        backgroundColor: '#dcfce7',
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    connectText: {
        color: '#166534',
        fontSize: 12,
        fontWeight: '600',
    },

    DeskNumberText: {
        fontSize: 24,
        fontWeight: 600,
        padding: 15,
        paddingLeft: 0,
    },

    CurrentHeightText: {
        fontSize: 30,
        fontWeight: 600,
        padding: 15,
        paddingLeft: 0,
        color: '#2563eb'
    },

    PresetView: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
        marginBottom: 12,
    },

    Preset: {
        flex: 1,
        height: 120,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    PresetText: {
        fontSize: 20,
        fontWeight: '600',

    },
    PresetSubText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    PresetTextHeader: {
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 15,
    },

    ProfileView: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
        marginBottom: 12,
    },

    Profile: {
        flex: 1,
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});