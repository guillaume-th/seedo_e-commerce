import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

export default function OrderBill({ data }) {
    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Commande #{data.id}</Text>
                    <Text>Articles</Text>
                    {
                        data.article.map((e) => {
                            return (
                                <Text>{e.name} x {e.quantity}</Text>
                            )
                        })
                    }
                </View>
            </Page>
        </Document>
    );
}