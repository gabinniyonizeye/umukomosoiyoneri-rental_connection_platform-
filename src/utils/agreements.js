import { ref } from 'vue'

const currentLanguage = ref(localStorage.getItem('language') || 'en')

const getTermsAndConditions = () => {
  const lang = currentLanguage.value
  
  if (lang === 'rw') {
    return `AMABWIRIZA N'AMATEGEKO Y'IKORESHWA

Yavuguruwe: Mutarama 2024

1. KWEMERA AMABWIRIZA
Mu gukora konti kuri Umukomisiyoneri, wemera gukurikiza aya mabwiriza. Niba utabyemeye, ntukoreshe urubuga rwacu.

2. KONTI Z'ABAKORESHA
2.1. Ugomba gutanga amakuru yukuri, yuzuye, kandi akurikije igihe.
2.2. Ushinzwe kubika ibanga ry'imibare yawe.
2.3. Ugomba kuba ufite nibura imyaka 18 kugirango ukoreshe urubuga.
2.4. Wemera gutanga ibyangombwa by'indangamuntu kugirango byemezwe.

3. IMYITWARIRE Y'ABAKORESHA
3.1. Wemera kutakoresha urubuga mu buryo butemewe n'amategeko.
3.2. Ntuzandika ibintu bitari ukuri cyangwa byubisha.
3.3. Ntuzatera abandi bakoresha nabi.
3.4. Ntuzagerageza guca umutekano wacu.

4. IBISABWA KU BINYIR'UBWITE
4.1. Ibintu byose byanditse bigomba kuba ari ukuri.
4.2. Ugomba kugira uburenganzira bwo gukodesha umutungo.
4.3. Ugomba gutanga indangamuntu n'amakuru y'ubwishyu.
4.4. Wemera ko ibintu byose byanditse bigomba kwemezwa n'umuyobozi.

5. AMABWIRIZA Y'ABAKODESHA
5.1. Gutuma kwose bigomba kwemezwa n'umunyir'ubwite.
5.2. Wemera kwita ku mutungo neza.
5.3. Ushinzwe ibyangiritse byose mu gihe cy'ubukode.
5.4. Ugomba gukurikiza amategeko yose yashyizweho n'umunyir'ubwite.

6. AMABWIRIZA Y'UBWISHYU
6.1. Amabwiriza y'ubwishyu yemezwa hagati y'uwakodesha n'umunyir'ubwite.
6.2. Umukomisiyoneri ntabwo ashinzwe impaka z'ubwishyu.

7. INSHINGANO
7.1. Umukomisiyoneri ni urubuga ruhuza abakodesha n'abanyir'ubwite.
7.2. Ntidushinzwe imiterere, umutekano, cyangwa amategeko y'imitungo yanditse.
7.3. Abakoresha bakorana ku bwabo.

8. GUHAGARIKA KONTI
8.1. Dufite uburenganzira bwo guhagarika konti zirenganya amabwiriza.
8.2. Abakoresha bahagaritswe bagomba kuvugana n'umuyobozi.

9. GUHINDURA AMABWIRIZA
9.1. Dufite uburenganzira bwo guhindura aya mabwiriza igihe cyose.

10. AMAKURU Y'ITUMANAHO
Email: admin@umukomisiyoneri.com
Telefoni: +250 780 960 424

MU GUKANDA "NDABYEMERA", WEMERA KO WASOMYE, WASOBANUKIRIYE, KANDI WEMERA GUKURIKIZA AYA MABWIRIZA.`
  }
  
  if (lang === 'fr') {
    return `CONDITIONS GÉNÉRALES D'UTILISATION

Dernière mise à jour: Janvier 2024

1. ACCEPTATION DES CONDITIONS
En créant un compte sur Umukomisiyoneri, vous acceptez d'être lié par ces Conditions Générales. Si vous n'acceptez pas, veuillez ne pas utiliser notre plateforme.

2. COMPTES UTILISATEURS
2.1. Vous devez fournir des informations exactes, complètes et à jour lors de l'inscription.
2.2. Vous êtes responsable du maintien de la confidentialité de vos identifiants.
2.3. Vous devez avoir au moins 18 ans pour utiliser cette plateforme.
2.4. Vous acceptez de fournir des documents d'identification valides à des fins de vérification.

3. CONDUITE DES UTILISATEURS
3.1. Vous acceptez de ne pas utiliser la plateforme à des fins illégales.
3.2. Vous ne publierez pas d'annonces fausses, trompeuses ou frauduleuses.
3.3. Vous ne harcèlerez, n'abuserez ou ne nuirez pas aux autres utilisateurs.
3.4. Vous ne tenterez pas de contourner nos mesures de sécurité.

4. EXIGENCES POUR LES ANNONCES (PROPRIÉTAIRES)
4.1. Toutes les annonces doivent être exactes et véridiques.
4.2. Vous devez avoir l'autorité légale de louer la propriété/véhicule.
4.3. Vous devez fournir une identification et des informations de paiement valides.
4.4. Vous acceptez que toutes les annonces soient soumises à l'approbation de l'administrateur.

5. CONDITIONS DE RÉSERVATION (LOCATAIRES)
5.1. Toutes les réservations sont soumises à l'approbation du propriétaire.
5.2. Vous acceptez de traiter la propriété/véhicule avec soin et respect.
5.3. Vous êtes responsable de tout dommage causé pendant votre période de location.
5.4. Vous devez respecter toutes les règles spécifiées par le propriétaire.

6. CONDITIONS DE PAIEMENT
6.1. Les conditions de paiement sont convenues entre le locataire et le propriétaire.
6.2. Umukomisiyoneri n'est pas responsable des litiges de paiement.

7. RESPONSABILITÉ ET DÉNIS
7.1. Umukomisiyoneri agit comme une plateforme reliant locataires et propriétaires.
7.2. Nous ne sommes pas responsables de l'état, de la sécurité ou de la légalité des propriétés listées.
7.3. Les utilisateurs interagissent à leurs propres risques.

8. SUSPENSION ET RÉSILIATION DE COMPTE
8.1. Nous nous réservons le droit de suspendre ou de résilier les comptes qui violent ces conditions.
8.2. Les utilisateurs suspendus doivent contacter l'administrateur.

9. MODIFICATIONS DES CONDITIONS
9.1. Nous nous réservons le droit de modifier ces conditions à tout moment.

10. INFORMATIONS DE CONTACT
Email: admin@umukomisiyoneri.com
Téléphone: +250 780 960 424

EN CLIQUANT SUR "J'ACCEPTE", VOUS RECONNAISSEZ AVOIR LU, COMPRIS ET ACCEPTÉ CES CONDITIONS GÉNÉRALES.`
  }
  
  return `TERMS AND CONDITIONS OF USE

Last Updated: January 2024

1. ACCEPTANCE OF TERMS
By creating an account on Umukomisiyoneri, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.

2. USER ACCOUNTS
2.1. You must provide accurate, complete, and current information during registration.
2.2. You are responsible for maintaining the confidentiality of your account credentials.
2.3. You must be at least 18 years old to use this platform.
2.4. You agree to provide valid identification documents for verification purposes.

3. USER CONDUCT
3.1. You agree not to use the platform for any unlawful purpose.
3.2. You will not post false, misleading, or fraudulent listings.
3.3. You will not harass, abuse, or harm other users.
3.4. You will not attempt to circumvent our security measures.

4. LISTING REQUIREMENTS (FOR OWNERS)
4.1. All listings must be accurate and truthful.
4.2. You must have legal authority to rent the property/vehicle.
4.3. You must provide valid identification and payment information.
4.4. You agree that all listings are subject to admin approval.
4.5. Rejected listings may be resubmitted after addressing admin feedback.

5. BOOKING TERMS (FOR RENTERS)
5.1. All bookings are subject to owner approval.
5.2. You agree to treat the property/vehicle with care and respect.
5.3. You are responsible for any damages caused during your rental period.
5.4. You must comply with all rules specified by the property owner.

6. PAYMENT TERMS
6.1. Payment terms are agreed upon between renter and owner.
6.2. Umukomisiyoneri is not responsible for payment disputes.
6.3. Cancellation policies are set by individual owners.

7. LIABILITY AND DISCLAIMERS
7.1. Umukomisiyoneri acts as a platform connecting renters and owners.
7.2. We are not responsible for the condition, safety, or legality of listed properties.
7.3. We are not liable for disputes between renters and owners.
7.4. Users interact at their own risk.

8. ACCOUNT SUSPENSION AND TERMINATION
8.1. We reserve the right to suspend or terminate accounts that violate these terms.
8.2. Suspended users must contact admin to resolve issues.
8.3. We may remove listings that violate our policies.

9. INTELLECTUAL PROPERTY
9.1. All content on Umukomisiyoneri is protected by copyright.
9.2. You grant us license to use content you upload for platform purposes.

10. DISPUTE RESOLUTION
10.1. Users agree to attempt good-faith resolution of disputes.
10.2. Unresolved disputes may be subject to arbitration under Rwandan law.

11. MODIFICATIONS TO TERMS
11.1. We reserve the right to modify these terms at any time.
11.2. Continued use of the platform constitutes acceptance of modified terms.

12. CONTACT INFORMATION
For questions about these terms, contact us at:
Email: admin@umukomisiyoneri.com
Phone: +250 780 960 424

BY CLICKING "I AGREE", YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.`
}

const getRentalAgreement = () => {
  const lang = currentLanguage.value
  
  if (lang === 'rw') {
    return `AMASEZERANO Y'UBUKODE

INGINGO: Soma neza mbere yo kwemeza gutuma.

1. AMABWIRIZA Y'UBUKODE
1.1. Aya masezerano ari hagati yawe (Uwakodesha) n'umunyir'ubwite.
1.2. Igihe cy'ubukode gitangira ku munsi wo kwinjira kigasozerwa ku munsi wo gusohoka.

2. UBWISHYU N'INGWATE
2.1. Ubwishyu bwose bugomba gukorwa nk'uko byemejwe n'umunyir'ubwite.
2.2. Ingwate y'umutekano irashobora gusabwa kandi izasubizwa nyuma yo kugenzura.

3. GUKORESHA NO KWITA KU MUTUNGO
3.1. Wemera gukoresha umutungo mu buryo bwiza kandi bukurikije amategeko.
3.2. Ntuzakodesha undi muntu utemewe.
3.3. Uzakurikiza amategeko yose y'ahantu.

4. IBYANGIRITSE N'INSHINGANO
4.1. Ushinzwe ibyangiritse byose ku mutungo mu gihe cy'ubukode bwawe.
4.2. Wemera kumenyesha ibyangiritse byose ako kanya umunyir'ubwite.
4.3. Ikiguzi cyo gusana kizavaho mu ngwate yawe.

5. IMITERERE Y'UMUTUNGO
5.1. Wemera gusubiza umutungo mu miterere imwe nk'uko wakiriye.
5.2. Ku modoka: Ugomba kugarura ufite peteroli nk'uko wakiriye.

6. UBWISHINGIZI
6.1. Ushinzwe kubona ubwishingizi bukwiye.
6.2. Umunyir'ubwite ntashinzwe igihombo cyangwa ibyangiritse ku bintu byawe.

7. UMUTEKANO N'IBYIHUTIRWA
7.1. Wemera gukurikiza amabwiriza yose y'umutekano yatanzwe n'umunyir'ubwite.
7.2. Mu gihe cy'akaga, hamagara abashinzwe umutekano mbere, hanyuma umenyeshe umunyir'ubwite.

8. AMATEGEKO Y'INZU/IMODOKA
8.1. Wemera gukurikiza amategeko yose yashyizweho n'umunyir'ubwite.
8.2. Kurenganya amategeko bishobora gutera guhagarika ubukode nta mbonerahamwe.

9. KWEMEZA RISIKI
9.1. Wemera ko ubukode bufite ingaruka zishobora kubaho.
9.2. Wemera ingaruka zose zijyanye n'ubukode bwawe.

MU KWEMEZA GUTUMA, WEMERA KO:
✓ Wasomye kandi wasobanukiriye aya masezerano
✓ Wemera amabwiriza yose yavuzwe hejuru
✓ Wemera inshingano zose ku mutungo mu gihe cy'ubukode
✓ Uzakurikiza amategeko yose y'umunyir'ubwite n'ay'ahantu

KWEMEZA KW'UWAKODESHA BIRASABWA KUGIRANGO UKOMEZE.`
  }
  
  if (lang === 'fr') {
    return `CONTRAT DE LOCATION ET DÉCHARGE DE RESPONSABILITÉ

IMPORTANT: Veuillez lire attentivement avant de confirmer votre réservation.

1. CONDITIONS DE LOCATION
1.1. Ce contrat est entre vous (le "Locataire") et le propriétaire (le "Propriétaire").
1.2. La période de location commence à la date d'arrivée et se termine à la date de départ spécifiée.

2. PAIEMENT ET DÉPÔTS
2.1. Le paiement intégral doit être effectué comme convenu avec le Propriétaire.
2.2. Un dépôt de garantie peut être requis et sera remboursé après inspection.

3. UTILISATION ET ENTRETIEN DE LA PROPRIÉTÉ
3.1. Vous acceptez d'utiliser la propriété/véhicule de manière responsable et légale.
3.2. Vous ne sous-louerez pas ou ne permettrez pas à des personnes non autorisées d'utiliser la location.
3.3. Vous respecterez toutes les lois et réglementations locales.

4. DOMMAGES ET RESPONSABILITÉ
4.1. Vous êtes entièrement responsable de tout dommage à la propriété/véhicule pendant votre période de location.
4.2. Vous acceptez de signaler immédiatement tout dommage au Propriétaire.
4.3. Les coûts de réparation seront déduits de votre dépôt de garantie.

5. ÉTAT DE LA PROPRIÉTÉ
5.1. Vous acceptez de laisser la propriété dans le même état que reçu.
5.2. Pour les véhicules: Vous devez retourner avec le même niveau de carburant que reçu.

6. ASSURANCE ET INDEMNISATION
6.1. Vous êtes responsable d'obtenir une couverture d'assurance appropriée.
6.2. Le Propriétaire n'est pas responsable de la perte ou des dommages à vos effets personnels.

7. SÉCURITÉ ET URGENCES
7.1. Vous acceptez de suivre toutes les instructions de sécurité fournies par le Propriétaire.
7.2. En cas d'urgence, contactez d'abord les autorités locales, puis informez le Propriétaire.

8. RÈGLES DE LA MAISON/VÉHICULE
8.1. Vous acceptez de respecter toutes les règles spécifiques établies par le Propriétaire.
8.2. La violation des règles peut entraîner la résiliation immédiate de la location sans remboursement.

9. RECONNAISSANCE DU RISQUE
9.1. Vous reconnaissez que la location de propriété/véhicules comporte des risques inhérents.
9.2. Vous assumez tous les risques associés à votre location.

EN CONFIRMANT CETTE RÉSERVATION, VOUS RECONNAISSEZ QUE:
✓ Vous avez lu et compris ce Contrat de Location
✓ Vous acceptez tous les termes et conditions énoncés ci-dessus
✓ Vous acceptez l'entière responsabilité de la propriété pendant votre période de location
✓ Vous respecterez toutes les règles du Propriétaire et les lois locales

CONFIRMATION DU LOCATAIRE REQUISE POUR PROCÉDER À LA RÉSERVATION.`
  }
  
  return `RENTAL AGREEMENT AND LIABILITY WAIVER

IMPORTANT: Please read carefully before confirming your booking.

1. RENTAL TERMS
1.1. This agreement is between you (the "Renter") and the property owner (the "Owner").
1.2. The rental period begins on the check-in date and ends on the check-out date specified in your booking.
1.3. Late check-out may result in additional charges.

2. PAYMENT AND DEPOSITS
2.1. Full payment must be made as agreed with the Owner.
2.2. A security deposit may be required and will be refunded after inspection.
2.3. Cancellation policies are set by the Owner and must be respected.

3. PROPERTY USE AND CARE
3.1. You agree to use the property/vehicle in a responsible and lawful manner.
3.2. You will not sublease or allow unauthorized persons to use the rental.
3.3. You will comply with all local laws and regulations.
3.4. Smoking, pets, and parties may be prohibited - check property rules.

4. DAMAGES AND LIABILITY
4.1. You are fully responsible for any damage to the property/vehicle during your rental period.
4.2. You agree to report any damages immediately to the Owner.
4.3. Repair costs will be deducted from your security deposit or billed separately.
4.4. You are liable for damages caused by your guests or visitors.

5. PROPERTY CONDITION
5.1. You agree to leave the property in the same condition as received.
5.2. Normal wear and tear is acceptable; excessive mess or damage is not.
5.3. For vehicles: You must return with the same fuel level as received.

6. INSURANCE AND INDEMNIFICATION
6.1. You are responsible for obtaining appropriate insurance coverage.
6.2. You agree to indemnify the Owner against claims arising from your use.
6.3. The Owner is not liable for loss or damage to your personal belongings.

7. SAFETY AND EMERGENCIES
7.1. You agree to follow all safety instructions provided by the Owner.
7.2. In case of emergency, contact local authorities first, then notify the Owner.
7.3. You will not tamper with safety equipment (smoke detectors, fire extinguishers, etc.).

8. HOUSE/VEHICLE RULES
8.1. You agree to comply with all specific rules set by the Owner.
8.2. Violation of rules may result in immediate termination of rental without refund.
8.3. Noise complaints, disturbances, or illegal activities will result in eviction.

9. INSPECTION AND ACCESS
9.1. The Owner reserves the right to inspect the property with reasonable notice.
9.2. In case of emergency, the Owner may access the property without notice.

10. CANCELLATION AND REFUNDS
10.1. Cancellation policies vary by Owner - review before booking.
10.2. No-shows or early departures do not qualify for refunds unless otherwise stated.

11. DISPUTE RESOLUTION
11.1. Any disputes will first be addressed through Umukomisiyoneri platform.
11.2. Both parties agree to good-faith negotiation before legal action.

12. ACKNOWLEDGMENT OF RISK
12.1. You acknowledge that rental of property/vehicles carries inherent risks.
12.2. You assume all risks associated with your rental.
12.3. You release Umukomisiyoneri and the Owner from liability for injuries or losses.

BY CONFIRMING THIS BOOKING, YOU ACKNOWLEDGE THAT:
✓ You have read and understood this Rental Agreement
✓ You agree to all terms and conditions stated above
✓ You accept full responsibility for the property during your rental period
✓ You will comply with all Owner rules and local laws
✓ You understand you may be held liable for damages or violations

RENTER CONFIRMATION REQUIRED TO PROCEED WITH BOOKING.`
}

export const TERMS_AND_CONDITIONS = getTermsAndConditions()
export const RENTAL_AGREEMENT = getRentalAgreement()

export function updateAgreements() {
  return {
    terms: getTermsAndConditions(),
    rental: getRentalAgreement()
  }
}
