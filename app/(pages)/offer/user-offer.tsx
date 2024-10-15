import React from 'react';
import {useNavigation} from 'expo-router';
import {StyleSheet, View, Text} from 'react-native';
import NavigationMenu from "@/components/navigation/NavigationMenu";
import Layout from "@/layout/layout";

const UserOffer: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <Layout scroll padding>
            <NavigationMenu name='Foydalanuvchi qo‘llanmasi'/>

            <View style={{paddingTop: 10}}>
                <Text style={styles.heading}>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</Text>
                <Text style={styles.updateDate}>Последнее обновление: 12.10.2024</Text>

                <Text style={styles.sectionTitle}>1. ОПРЕДЕЛЕНИЯ</Text>
                <Text style={styles.text}>
                    1.1. Платформа iStadiums — онлайн-сервис для бронирования спортивных объектов, включающий мобильное
                    приложение и веб-сайт.
                </Text>
                <Text style={styles.text}>
                    1.2. Пользователь — физическое или юридическое лицо, использующее Платформу для бронирования услуг.
                </Text>
                <Text style={styles.text}>
                    1.3. Владелец объекта — лицо, предоставляющее спортивные объекты для аренды через Платформу.
                </Text>
                <Text style={styles.text}>
                    1.4. Дополнительные услуги — аренда инвентаря, услуги тренеров, и иные опции, доступные при
                    бронировании.
                </Text>

                <Text style={styles.sectionTitle}>2. УСЛУГИ ПЛАТФОРМЫ</Text>
                <Text style={styles.text}>
                    2.1. Платформа предоставляет возможность:
                </Text>
                <Text style={styles.textIndent}>
                    - Бронировать спортивные объекты в режиме онлайн.
                </Text>
                <Text style={styles.textIndent}>
                    - Оплачивать аренду через защищённые платёжные шлюзы.
                </Text>
                <Text style={styles.textIndent}>
                    - Получать уведомления о статусе бронирования и предстоящих арендах.
                </Text>
                <Text style={styles.textIndent}>
                    - Управлять бронированием через интеграции с календарями (Google, Apple, Outlook).
                </Text>

                <Text style={styles.sectionTitle}>3. ПОРЯДОК РЕГИСТРАЦИИ И ИСПОЛЬЗОВАНИЯ</Text>
                <Text style={styles.text}>
                    3.1. Для использования Платформы Пользователь обязан создать учётную запись, предоставив актуальную
                    информацию.
                </Text>
                <Text style={styles.text}>
                    3.2. Пользователь несет ответственность за сохранность логина и пароля.
                </Text>
                <Text style={styles.text}>
                    3.3. Запрещается передавать третьим лицам доступ к аккаунту без письменного согласия Платформы.
                </Text>

                <Text style={styles.sectionTitle}>4. ПОРЯДОК ОПЛАТЫ И ВОЗВРАТОВ</Text>
                <Text style={styles.text}>
                    4.1. Оплата производится через банковские карты, PayPal или Apple Pay.
                </Text>
                <Text style={styles.text}>
                    4.2. В случае отмены бронирования возврат средств осуществляется в соответствии с политикой
                    возвратов, установленной владельцем объекта.
                </Text>
                <Text style={styles.text}>
                    4.3. Возврат средств за дополнительные услуги возможен только при условии своевременной отмены
                    бронирования.
                </Text>

                <Text style={styles.sectionTitle}>5. ПРАВА И ОБЯЗАННОСТИ СТОРОН</Text>
                <Text style={styles.text}>
                    5.1. Права и обязанности Платформы:
                </Text>
                <Text style={styles.textIndent}>
                    - Обеспечивать доступность сервиса и актуальность информации.
                </Text>
                <Text style={styles.textIndent}>
                    - Своевременно уведомлять Пользователей о статусе бронирований.
                </Text>
                <Text style={styles.textIndent}>
                    - Предоставлять техподдержку в случае возникновения вопросов.
                </Text>
                <Text style={styles.text}>
                    5.2. Права и обязанности Пользователя:
                </Text>
                <Text style={styles.textIndent}>
                    - Предоставлять корректную информацию при регистрации и бронировании.
                </Text>
                <Text style={styles.textIndent}>
                    - Использовать Платформу только в законных целях.
                </Text>
                <Text style={styles.textIndent}>
                    - Соблюдать правила использования спортивных объектов и дополнительные условия владельцев объектов.
                </Text>

                <Text style={styles.sectionTitle}>6. ОТВЕТСТВЕННОСТЬ СТОРОН</Text>
                <Text style={styles.text}>
                    6.1. Платформа не несет ответственность за действия владельцев объектов и качество предоставляемых
                    услуг.
                </Text>
                <Text style={styles.text}>
                    6.2. Пользователь несет ответственность за достоверность предоставленных данных и соблюдение условий
                    аренды.
                </Text>
                <Text style={styles.text}>
                    6.3. В случае нарушения правил использования объектов владелец имеет право отказать в аренде.
                </Text>

                <Text style={styles.sectionTitle}>7. ЗАЩИТА ДАННЫХ</Text>
                <Text style={styles.text}>
                    7.1. Платформа обязуется обеспечивать конфиденциальность персональных данных Пользователей.
                </Text>
                <Text style={styles.text}>
                    7.2. Данные могут передаваться третьим лицам только для выполнения условий бронирования или в
                    случаях, предусмотренных законодательством.
                </Text>

                <Text style={styles.sectionTitle}>8. ИЗМЕНЕНИЯ В СОГЛАШЕНИИ</Text>
                <Text style={styles.text}>
                    8.1. Платформа оставляет за собой право вносить изменения в настоящее Соглашение.
                </Text>
                <Text style={styles.text}>
                    8.2. Об изменениях Пользователи уведомляются через электронную почту или мобильное приложение.
                    Продолжение использования Платформы после уведомления означает согласие с новыми условиями.
                </Text>

                <Text style={styles.sectionTitle}>9. ПРЕКРАЩЕНИЕ СОГЛАШЕНИЯ</Text>
                <Text style={styles.text}>
                    9.1. Пользователь может прекратить использование Платформы в любой момент.
                </Text>
                <Text style={styles.text}>
                    9.2. Платформа имеет право приостановить или прекратить доступ Пользователя в случае нарушения
                    условий Соглашения.
                </Text>

                <Text style={styles.sectionTitle}>10. РАЗРЕШЕНИЕ СПОРОВ</Text>
                <Text style={styles.text}>
                    10.1. Все споры, возникающие в связи с исполнением настоящего Соглашения, решаются путем
                    переговоров.
                </Text>
                <Text style={styles.text}>
                    10.2. В случае невозможности урегулирования спора мирным путем он подлежит рассмотрению в суде по
                    месту нахождения Платформы.
                </Text>

                <Text style={styles.sectionTitle}>11. КОНТАКТНАЯ ИНФОРМАЦИЯ</Text>
                <Text style={styles.text}>
                    Для всех вопросов, связанных с использованием Платформы, Пользователь может связаться с
                    техподдержкой:
                </Text>
                <Text style={styles.textIndent}>Email: support@istadiums.com</Text>
                <Text style={styles.textIndent}>Телефон: +998 [номер телефона]</Text>

                <Text style={styles.text}>Приняв условия настоящего Соглашения, Пользователь подтверждает своё согласие
                    с ним и обязуется соблюдать установленные правила.</Text>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        opacity: .8
    },
    updateDate: {
        fontSize: 14,
        marginBottom: 20,
        color: '#fff',
        opacity: .5
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#fff',
        opacity: .7
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
        color: '#fff',
        opacity: .6
    },
    textIndent: {
        fontSize: 16,
        marginBottom: 10,
        paddingLeft: 10,
        lineHeight: 24,
        color: '#fff',
        opacity: .6
    }
});

export default UserOffer;
