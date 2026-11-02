import { StyleSheet } from 'react-native';

export const UserInfoScreenStyle = StyleSheet.create({
    container: {
        padding: 24,
        gap: 14,
        backgroundColor: '#f9fafb',
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4b5563',
        letterSpacing: 0.5,
        marginBottom: 8,
        marginTop: 8,
    },

    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 14,
    },

    step: {
        flexDirection: 'row',
        gap: 12,
        padding: 14,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 999,
        backgroundColor: '#dbeafe',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1d4ed8',
    },
    stepTextBox: {
        flex: 1,
        gap: 2,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    stepText: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
    },

    problem: {
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    problemLast: {
        borderBottomWidth: 0,
    },
    question: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        minHeight: 52,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    questionText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
    },
    questionIcon: {
        fontSize: 20,
        color: '#4b5563',
    },
    fixes: {
        paddingHorizontal: 16,
        paddingBottom: 14,
        gap: 6,
    },
    fixText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },

    contactBox: {
        backgroundColor: '#fff7ed',
        borderWidth: 1,
        borderColor: '#fed7aa',
        borderRadius: 14,
        padding: 16,
        gap: 10,
        marginTop: 8,
    },
    contactTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    contactText: {
        fontSize: 14,
        color: '#9a3412',
        lineHeight: 20,
    },
    contactButton: {
        height: 46,
        borderRadius: 10,
        backgroundColor: '#c2410c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },

    version: {
        textAlign: 'center',
        fontSize: 13,
        color: '#6b7280',
        marginTop: 16,
    },
});