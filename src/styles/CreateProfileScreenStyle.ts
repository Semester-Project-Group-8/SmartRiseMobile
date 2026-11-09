import { StyleSheet } from 'react-native';

export const CreateProfileStyle = StyleSheet.create({
    Container:{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'white',
    },

    Header:{
        marginTop: 40,
        paddingBottom: 12,
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
    },
    HeaderWelcomeText:{
        fontSize: 25,
        textAlign: 'center',
    },
    HeaderText:{
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },

    Label:{
        fontSize: 15,
        fontWeight: '500',
        color: '#334155',
        marginBottom: 8,
    },
    Input:{
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },

    Row:{
        flexDirection: 'row',
        gap: 12,
    },
    BirthDateColumn:{
        flex: 2,
    },
    HeightColumn:{
        flex: 1,
    },
    HeightInputBox:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 14,
        marginBottom: 16,
    },
    HeightInput:{
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },
    HeightUnit:{
        fontSize: 14,
        color: '#334155',
        marginLeft: 4,
    },

    Button:{
        backgroundColor: '#2563eb',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 16,
    },
    ButtonText:{
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },

    Footer:{
        marginTop: 20,
    },
    FooterText:{
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
    },
})
