import Image from 'next/image';
import { Mail, Phone, MapPin, Pencil } from 'lucide-react';
import { User } from '@/types/user';
import images from '@/assets/images';
import { useMemo } from 'react';

type ProfileCardProps = {
  profile: User
  onEdit?: () => void;
};

export default function ProfileCard({
  profile,
  onEdit,
}: ProfileCardProps) {
  const { avatarUrl, fullName, email, phone, address, firstName, lastName } = profile;

  const initials = useMemo(() => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last;
  }, [profile]);

  return (
    <div className="rounded-xl bg-white p-2 md:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {avatarUrl ? <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
            <Image
              src={avatarUrl || images?.profile}
              alt={fullName}
              fill
              className="object-cover"
            />
          </div>
            :
            <div role="button" className="btn btn-ghost btn-circle avatar">
              <div
                role="button"
                className="btn btn-ghost btn-circle avatar justify-end"
              >
                <div className="w-24 h-24 border-2 rounded-full flex items-center justify-center bg-secondary text-white font-bold text-lg">
                  {initials || 'U'}
                </div>
              </div>

            </div>

          }

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {fullName || `${firstName + ' ' + lastName}` || 'N/A'}
            </h2>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>{email || 'N/A'}</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>{phone || 'N/A'}</span>
              </li>

              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{address || "N/A"}</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
          <Pencil size={16} />
          <span className='hidden md:block'>Edit Profile</span>
        </button>


      </div>
    </div>
  );
}
