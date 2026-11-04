import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { UserInfoScreenStyle } from '../styles/UserInformationScreenStyle';

const steps = [
    { title: 'Walk up to your desk', text: 'The beacon on the desk notices your phone and connects automatically.' },
    { title: 'Your desk gets ready', text: 'It moves to your preferred height, using your Sit preset.' },
    { title: 'Sit or stand', text: 'Tap Sit or Stand on the home screen. Change the heights in your Profile.' },
];

const problems = [
    {
        question: 'My desk says "Not connected"',
        fixes: [
            'Turn on Bluetooth on your phone.',
            'Stand right next to your desk, within about 2 metres.',
            'Close the app fully and open it again.',
        ],
    },
    {
        question: "The desk doesn't move",
        fixes: [
            'Check that the desk is plugged in and nothing is blocking it.',
            'Wait a few seconds and press the button again.',
            'Try the buttons on the desk itself.',
        ],
    },
];

export default function Information() {
    return (
        <ScrollView contentContainerStyle={UserInfoScreenStyle.container}>
            <HowItWorks />
            <Troubleshooting />
            <ContactAdmin />
            <Text style={UserInfoScreenStyle.version}>SmartRise · version 1.0</Text>
        </ScrollView>
    );
}

function HowItWorks() {
    return (
        <View>
            <Text style={UserInfoScreenStyle.sectionTitle}>HOW IT WORKS</Text>
            <View style={UserInfoScreenStyle.card}>
                {steps.map((step, index) => (
                    <View key={index} style={UserInfoScreenStyle.step}>
                        <View style={UserInfoScreenStyle.stepNumber}>
                            <Text style={UserInfoScreenStyle.stepNumberText}>{index + 1}</Text>
                        </View>
                        <View style={UserInfoScreenStyle.stepTextBox}>
                            <Text style={UserInfoScreenStyle.stepTitle}>{step.title}</Text>
                            <Text style={UserInfoScreenStyle.stepText}>{step.text}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

function Troubleshooting() {
    
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <View>
            <Text style={UserInfoScreenStyle.sectionTitle}>SOMETHING NOT WORKING?</Text>
            <View style={UserInfoScreenStyle.card}>
                {problems.map((problem, index) => {
                    const isOpen = openIndex === index;
                    const isLast = index === problems.length - 1;

                    return (
                        <View
                            key={index}
                            style={[UserInfoScreenStyle.problem, isLast && UserInfoScreenStyle.problemLast]}
                        >
                            <Pressable
                                style={UserInfoScreenStyle.question}
                                onPress={() => setOpenIndex(isOpen ? -1 : index)}
                            >
                                <Text style={UserInfoScreenStyle.questionText}>{problem.question}</Text>
                                <Text style={UserInfoScreenStyle.questionIcon}>{isOpen ? '−' : '+'}</Text>
                            </Pressable>

                            {isOpen && (
                                <View style={UserInfoScreenStyle.fixes}>
                                    {problem.fixes.map((fix, fixIndex) => (
                                        <Text key={fixIndex} style={UserInfoScreenStyle.fixText}>• {fix}</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

function ContactAdmin() {
    return (
        <View style={UserInfoScreenStyle.contactBox}>
            <Text style={UserInfoScreenStyle.contactTitle}>Still not working?</Text>
            <Text style={UserInfoScreenStyle.contactText}>
                Contact your admin and tell them your desk number and what happened.
            </Text>
            <Pressable style={UserInfoScreenStyle.contactButton} onPress={() => console.log('Report a problem')}>
                <Text style={UserInfoScreenStyle.contactButtonText}>Report a problem</Text>
            </Pressable>
        </View>
    );
}