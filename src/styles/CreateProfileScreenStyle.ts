import { StyleSheet } from 'react-native';

export const CreateProfileStyle = StyleSheet.create({
    KeyboardAvoider: {
        flex: 1,
        backgroundColor: 'white',
    },
    Container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'white',
    },

    SuccessContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        paddingBottom: 120,
        backgroundColor: 'white',
    },
    SuccessHeader: {
        paddingBottom: 12,
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
    },

    Header: {
        marginTop: 40,
        paddingBottom: 12,
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
    },
    HeaderWelcomeText: {
        fontSize: 25,
        textAlign: 'center',
    },
    HeaderText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },

    Label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#334155',
        marginBottom: 8,
    },
    Input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },

    Row: {
        flexDirection: 'row',
        gap: 12,
    },
    BirthDateColumn: {
        flex: 2,
    },
    DateInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        padding: 14,
        marginBottom: 16,
    },
    DateText: {
        fontSize: 16,
        color: '#000000',
    },
    DatePlaceholder: {
        fontSize: 16,
        color: '#64748b',
    },
    IosPickerBox: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        padding: 8,
        marginBottom: 16,
    },
    IosPickerDone: {
        alignSelf: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    IosPickerDoneText: {
        color: '#2563eb',
        fontSize: 16,
        fontWeight: '600',
    },
    HeightColumn: {
        flex: 1,
    },
    HeightInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 14,
        marginBottom: 16,
    },
    HeightInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },
    HeightUnit: {
        fontSize: 14,
        color: '#334155',
        marginLeft: 4,
    },

    ErrorText: {
        color: '#b91c1c',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 16,
    },
    Button: {
        backgroundColor: '#2563eb',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 16,
    },
    ButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },

    Footer: {
        marginTop: 20,
    },
    FooterText: {
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
    },
    PasswordInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 14,
        marginBottom: 16,
    },
    PasswordInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color:"#000000"
    },
})
