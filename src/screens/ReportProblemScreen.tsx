import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ReportProblemScreenStyle } from "../styles/ReportProblemScreenStyle";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { reportProblem } from "../services/api";

export default function Report() {
    const { user } = useAuth();
    const navigation = useNavigation<any>();
    const [Name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const HandleReport = async () => {
        setError("");
        setSuccess(false);

        if (!Name.trim() || !description.trim()) {
            setError("Please fill in both the problem and the description.");
            return;
        }
        if (!user) {
            setError("You need to be logged in to report a problem.");
            return;
        }
        if (!user.assignedDeskID) {
            setError("You don't have a desk assigned, so the report can't be linked to a desk.");
            return;
        }

        setLoading(true);
        try {
            await reportProblem(Name.trim(), description.trim(), user.id, user.assignedDeskID);
            setSuccess(true);
            setName("");
            setDescription("");
            setTimeout(() => navigation.goBack(), 1500);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={ReportProblemScreenStyle.Container} keyboardShouldPersistTaps="handled">
            <Header></Header>

            <Text style={ReportProblemScreenStyle.Label}>Problem</Text>
            <TextInput
                style={ReportProblemScreenStyle.Input}
                placeholder="Name the problem"
                placeholderTextColor="#9ca3af"
                value={Name}
                onChangeText={setName}
            />

            <Text style={ReportProblemScreenStyle.Label}>Description</Text>
            <TextInput
                style={[ReportProblemScreenStyle.Input, ReportProblemScreenStyle.DescriptionInput]}
                placeholder="Give us description"
                placeholderTextColor="#9ca3af"
                multiline
                value={description}
                onChangeText={setDescription}
            />

            {error !== "" && <Text style={ReportProblemScreenStyle.ErrorText}>{error}</Text>}
            {success && <Text style={ReportProblemScreenStyle.SuccessText}>Report sent. Thank you!</Text>}

            <Pressable
                style={({ pressed }) => [
                    ReportProblemScreenStyle.Button,
                    (pressed || loading) && ReportProblemScreenStyle.ButtonPressed,
                ]}
                onPress={HandleReport}
                disabled={loading}
            >
                {loading
                    ? <ActivityIndicator color="white" />
                    : <Text style={ReportProblemScreenStyle.ButtonText}>Submit report</Text>}
            </Pressable>

            <Footer></Footer>
        </ScrollView>
    )
}

function Header() {
    return (
        <View style={ReportProblemScreenStyle.Header}>
            <Text style={ReportProblemScreenStyle.HeaderTitle}>We want to hear about your problem</Text>
            <Text style={ReportProblemScreenStyle.HeaderText}>Your employee ID and desk ID are automatically saved when you are logged in</Text>
        </View>
    )
}

function Footer() {
    return (
        <View style={ReportProblemScreenStyle.Footer}>
            <Text style={ReportProblemScreenStyle.FooterTitle}>Thank you for your input</Text>
            <Text style={ReportProblemScreenStyle.FooterText}>In case of problems with the form please contact your admin</Text>
        </View>
    )
}
