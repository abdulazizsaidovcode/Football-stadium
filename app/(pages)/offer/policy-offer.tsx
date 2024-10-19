import React from 'react';
// import {useNavigation} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';
import NavigationMenu from "@/components/navigation/NavigationMenu";
import Layout from "@/layout/layout";

const PolicyOffer: React.FC = () => {
    // const navigation = useNavigation<any>();

    return (
        <Layout scroll padding>
            <NavigationMenu name='Maxfiylik siyosati'/>

            <View style={{paddingTop: 10}}>
                <Text style={styles.heading}>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ (PRIVACY POLICY)</Text>
                <Text style={styles.updateDate}>Последнее обновление: 12.10.2024</Text>

                <Text style={styles.text}>
                    Настоящая Политика конфиденциальности описывает, как Платформа iStadiums (далее — «Платформа», «мы»,
                    «наш») собирает, использует, хранит и защищает персональные данные пользователей (далее —
                    «Пользователь», «вы»). Используя Платформу, вы соглашаетесь с условиями данной Политики
                    конфиденциальности.
                </Text>

                <Text style={styles.sectionTitle}>1. СОБИРАЕМЫЕ ДАННЫЕ</Text>
                <Text style={styles.text}>
                    1.1. Персональные данные:
                </Text>
                <Text style={styles.textIndent}>
                    - Имя, фамилия, контактная информация (телефон, email).
                </Text>
                <Text style={styles.textIndent}>
                    - Платёжные данные (номер карты, информация для оплаты).
                </Text>
                <Text style={styles.textIndent}>
                    - Данные о бронированиях и использовании услуг Платформы.
                </Text>
                <Text style={styles.text}>
                    1.2. Автоматически собираемые данные:
                </Text>
                <Text style={styles.textIndent}>
                    - IP-адрес и данные о местоположении.
                </Text>
                <Text style={styles.textIndent}>
                    - История посещений и действий на Платформе.
                </Text>
                <Text style={styles.textIndent}>
                    - Информация об устройстве и браузере, используемых для доступа.
                </Text>
                <Text style={styles.text}>
                    1.3. Cookies:
                </Text>
                <Text style={styles.textIndent}>
                    Мы используем файлы cookies для улучшения пользовательского опыта и персонализации услуг. Вы можете
                    управлять настройками cookies в браузере.
                </Text>

                <Text style={styles.sectionTitle}>2. ИСПОЛЬЗОВАНИЕ ДАННЫХ</Text>
                <Text style={styles.text}>
                    2.1. Собранные данные используются для:
                </Text>
                <Text style={styles.textIndent}>
                    - Обработки бронирований и предоставления услуг.
                </Text>
                <Text style={styles.textIndent}>
                    - Осуществления платежей и обеспечения безопасности транзакций.
                </Text>
                <Text style={styles.textIndent}>
                    - Отправки уведомлений о бронированиях и акциях.
                </Text>
                <Text style={styles.textIndent}>
                    - Улучшения качества обслуживания и работы Платформы.
                </Text>
                <Text style={styles.textIndent}>
                    - Персонализации рекомендаций и предложений.
                </Text>
                <Text style={styles.text}>
                    2.2. В случае необходимости данные могут использоваться для выполнения требований законодательства
                    или защиты наших прав и интересов.
                </Text>

                <Text style={styles.sectionTitle}>3. ОБМЕН ДАННЫМИ</Text>
                <Text style={styles.text}>
                    3.1. Мы можем передавать персональные данные третьим лицам в следующих случаях:
                </Text>
                <Text style={styles.textIndent}>
                    - Владелецам спортивных объектов для выполнения бронирования.
                </Text>
                <Text style={styles.textIndent}>
                    - Платёжным системам для обработки транзакций.
                </Text>
                <Text style={styles.textIndent}>
                    - Партнёрским сервисам для предоставления дополнительных услуг (например, тренеров, инвентаря).
                </Text>
                <Text style={styles.textIndent}>
                    - Правоохранительным органам по законному запросу.
                </Text>
                <Text style={styles.text}>
                    3.2. Мы не передаем персональные данные третьим лицам для маркетинговых целей без вашего согласия.
                </Text>

                <Text style={styles.sectionTitle}>4. ЗАЩИТА ДАННЫХ</Text>
                <Text style={styles.text}>
                    4.1. Мы принимаем все необходимые меры для защиты данных от несанкционированного доступа, изменения,
                    утраты или уничтожения.
                </Text>
                <Text style={styles.text}>
                    4.2. Доступ к данным имеют только сотрудники, которым это необходимо для выполнения служебных
                    обязанностей.
                </Text>
                <Text style={styles.text}>
                    4.3. Все платёжные транзакции проходят через защищённые шлюзы с использованием шифрования.
                </Text>

                <Text style={styles.sectionTitle}>5. ХРАНЕНИЕ ДАННЫХ</Text>
                <Text style={styles.text}>
                    5.1. Данные хранятся на серверах Платформы в течение срока, необходимого для выполнения целей их
                    обработки.
                </Text>
                <Text style={styles.text}>
                    5.2. По окончании срока хранения данные будут безопасно удалены или анонимизированы.
                </Text>

                <Text style={styles.sectionTitle}>6. ПРАВА ПОЛЬЗОВАТЕЛЯ</Text>
                <Text style={styles.text}>
                    6.1. Доступ к данным: Пользователь имеет право запросить информацию о своих данных, хранящихся на
                    Платформе.
                </Text>
                <Text style={styles.text}>
                    6.2. Исправление данных: Пользователь может запросить исправление или обновление неточной
                    информации.
                </Text>
                <Text style={styles.text}>
                    6.3. Удаление данных: Пользователь вправе потребовать удаления своих данных, если они больше не
                    нужны для предоставления услуг.
                </Text>
                <Text style={styles.text}>
                    6.4. Отказ от маркетинговых сообщений: Пользователь может отказаться от получения рекламных рассылок
                    в любое время.
                </Text>

                <Text style={styles.sectionTitle}>7. ИЗМЕНЕНИЯ ПОЛИТИКИ</Text>
                <Text style={styles.text}>
                    7.1. Мы оставляем за собой право вносить изменения в данную Политику конфиденциальности.
                </Text>
                <Text style={styles.text}>
                    7.2. О любых изменениях мы уведомим вас через электронную почту или мобильное приложение.
                    Продолжение использования Платформы означает ваше согласие с обновлённой Политикой.
                </Text>

                <Text style={styles.sectionTitle}>8. СОГЛАСИЕ НА ОБРАБОТКУ ДАННЫХ</Text>
                <Text style={styles.text}>
                    Используя Платформу, вы подтверждаете своё согласие на сбор, использование и хранение данных в
                    соответствии с данной Политикой конфиденциальности.
                </Text>

                <Text style={styles.sectionTitle}>9. КОНТАКТНАЯ ИНФОРМАЦИЯ</Text>
                <Text style={styles.text}>
                    Если у вас возникли вопросы о данной Политике конфиденциальности или обработке данных, свяжитесь с
                    нами:
                </Text>
                <Text style={styles.textIndent}>Email: privacy@istadiums.com</Text>
                <Text style={styles.textIndent}>Телефон: +998 [номер телефона]</Text>
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

export default PolicyOffer;
