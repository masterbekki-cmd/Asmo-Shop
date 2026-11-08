import { useState } from 'react';
import { Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FormInput from '../../components/FormInput';
import { updateProduct } from '../../services/productService';

export default function EditScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
	id: string
	nomi: string
	materiali: string
	rangi: string
	razmeri: string
	narxi: string
	rasm: string
}>()

  const [nomi, setNomi] = useState(params.nomi ?? '');
  const [materiali, setMateriali] = useState(params.materiali ?? '');
  const [rangi, setRangi] = useState(params.rangi ?? '');
  const [razmeri, setRazmeri] = useState(params.razmeri ?? '');
  const [narxi, setNarxi] = useState(params.narxi ?? '');
  const [rasm, setRasm] = useState(params.rasm ?? '')
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!nomi.trim() || !narxi.trim()) {
      Alert.alert('Xato', 'Nomi va narxi majburiy');
      return;
    }

    try {
      setSaving(true);
      await updateProduct(Number(params.id), {
        nomi: nomi.trim(),
        materiali: materiali.trim(),
        rangi: rangi.trim(),
        razmeri: razmeri.trim(),
        narxi: Number(narxi),
        rasm: rasm.trim() || null,
      });
      router.back();
    } catch (err) {
      Alert.alert('Xato', "Yangilab bo'lmadi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pt-16 px-4 pb-10">
      <Text className="text-3xl font-bold mb-4">Tahrirlash</Text>

      <FormInput label="Nomi" value={nomi} onChangeText={setNomi} />
      <FormInput label="Materiali" value={materiali} onChangeText={setMateriali} />
      <FormInput label="Rangi" value={rangi} onChangeText={setRangi} />
      <FormInput label="Razmeri" value={razmeri} onChangeText={setRazmeri} />
      <FormInput
        label="Narxi"
        value={narxi}
        onChangeText={setNarxi}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={saving}
        className="bg-blue-600 rounded-lg py-3 mt-2"
      >
        <Text className="text-white text-center font-semibold">
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} className="py-3 mt-2">
        <Text className="text-center text-gray-500">Bekor qilish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}