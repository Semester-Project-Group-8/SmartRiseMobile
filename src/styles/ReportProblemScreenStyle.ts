import { StyleSheet } from 'react-native';

export const ReportProblemScreenStyle = StyleSheet.create({
    Container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: 'white',
    },

    Header: {
        paddingBottom: 12,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
    },
    HeaderTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#0f172a',
        textAlign: 'center',
    },
    HeaderText: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 20,
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
        color: '#0f172a',
        marginBottom: 16,
    },
    DescriptionInput: {
        minHeight: 140,
        textAlignVertical: 'top',
    },

    ErrorText: {
        fontSize: 14,
        color: '#b91c1c',
        marginBottom: 8,
    },
    SuccessText: {
        fontSize: 14,
        color: '#15803d',
        fontWeight: '500',
        marginBottom: 8,
    },

    Button: {
        backgroundColor: '#2563eb',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    ButtonPressed: {
        opacity: 0.85,
    },
    ButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },

    Footer: {
        marginTop: 24,
        gap: 4,
    },
    FooterTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
    },
    FooterText: {
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
    },
});
