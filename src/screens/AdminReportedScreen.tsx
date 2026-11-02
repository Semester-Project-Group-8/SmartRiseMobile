import { View, Text } from "react-native";
import { AdminReportedScreenStyle } from "../styles/AdminReportedScreenStyle";
export default function Reported() {
    return (
        <View>
            <Text style={AdminReportedScreenStyle.Headertext}>Currently you have 1 issue reported</Text>
            <Issues />
        </View>
    );
}

function Issues() {
    return (
        <View>
            <View style={AdminReportedScreenStyle.Container}>
                <Text style={AdminReportedScreenStyle.DeskName}>Desk 2</Text>
                <View style={AdminReportedScreenStyle.Divider} />
                <Text style={AdminReportedScreenStyle.Label}>Reported issue</Text>
                <Text style={AdminReportedScreenStyle.IssueText}>Some issue</Text>
            </View>
        </View>
    );
}
